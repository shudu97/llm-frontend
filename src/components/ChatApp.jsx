import React, { useState } from 'react';
import { Card, CardFooter, CardHeader } from "./ui/card";
import {Splitter, SplitterPanel} from 'primereact/splitter';
import { PromptInput } from "./ui/prompt_input";
import { ChatHistory } from "./ui/chat_history";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (inputMessage.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { content: inputMessage, sender: 'user' }]);

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
      
      // Add AI response to the chat
      setMessages(prevMessages => [...prevMessages, { content: data.message, sender: 'ai' }]);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line in textarea
      sendMessage(e);
    }
  };

  return (
    <Splitter style={{ height: '100vh'}}>
      <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
        <Card className="w-full max-w-md mx-auto mt-10" style={{width: '100%', 'padding': '15px', 'align-self': 'flex-end'}}>
          <ChatHistory messages={messages} />
          <CardFooter>
            <form onSubmit={sendMessage} className="w-full">
              <PromptInput
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
              />
            </form>
          </CardFooter>
        </Card>
      </SplitterPanel>
      <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={10}>
          Editor
      </SplitterPanel>
    </Splitter>
  );
};

export default ChatApp;