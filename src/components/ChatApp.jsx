import React, { useState } from 'react';
import {Splitter, SplitterPanel} from 'primereact/splitter';
import { PromptInput } from "./ui/prompt_input";
import { ChatHistory } from "./ui/chat_history";
import { Editor } from 'primereact/editor';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAgentThinking, setIsAgentThinking] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { content: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setIsAgentThinking(true);

    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { content: data.message, sender: 'agent' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { content: "Sorry, there was an error processing your message.", sender: 'agent' }]);
    } finally {
      setIsAgentThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <Splitter style={{ height: '100vh'}} pt={{'gutterHandler': {style: {display: 'none'}}}}>
      <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
        <div style={{
          width: '100%', 
          height: '100%', 
          padding: '15px', 
          display: 'flex', 
          flexDirection: 'column'
        }}>
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'hidden'
          }}>
            <ChatHistory messages={messages} isAgentThinking={isAgentThinking}/>
          </div>
          <div className="flex items-center p-6 pt-0">
            <form onSubmit={sendMessage} className="w-full">
              <PromptInput
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
              />
            </form>
          </div>
        </div>
      </SplitterPanel>
      <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={10}>
          <Editor style={{border: 'none'}} pt={{root: {style: {width: '-webkit-fill-available', height: '96vh'}}}}/>
      </SplitterPanel>
    </Splitter>
  );
};

export default ChatApp;