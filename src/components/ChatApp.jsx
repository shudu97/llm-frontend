import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PromptInput } from "./ui/prompt_input";
import { ChatHistory } from "./ui/chat_history";
import './styles/ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const eventSourceRef = useRef(null);
  const hasReceivedResponse = useRef(false);

  const sendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { content: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setIsAgentThinking(true);
    setStreamingMessage('');
    hasReceivedResponse.current = false;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = new EventSource(`http://localhost:8000/chat?message=${encodeURIComponent(inputMessage)}`);

    eventSourceRef.current.onmessage = (event) => {
      const newContent = event.data;
      setStreamingMessage(prev => prev + newContent);
      setIsAgentThinking(false);
      hasReceivedResponse.current = true;
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSourceRef.current.close();
      setIsAgentThinking(false);
      if (!hasReceivedResponse.current) {
        setMessages(prevMessages => [...prevMessages, { content: "Sorry, there was an error processing your message.", sender: 'agent' }]);
      }
    };

    eventSourceRef.current.onopen = () => {
      setIsAgentThinking(true);
    };
  }, [inputMessage]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (streamingMessage) {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        if (newMessages[newMessages.length - 1]?.sender === 'agent') {
          newMessages[newMessages.length - 1].content = streamingMessage;
        } else {
          newMessages.push({ content: streamingMessage, sender: 'agent' });
        }
        return newMessages;
      });
    }
  }, [streamingMessage]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="chat-app-panel">
      <ChatHistory 
        messages={messages} 
        isAgentThinking={isAgentThinking} 
        streamingMessage={streamingMessage}
      />
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
  );
};

export default ChatApp;