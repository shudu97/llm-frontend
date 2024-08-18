import React, { useRef, useEffect } from 'react';
import { Message } from 'primereact/message';
import { Avatar } from 'primereact/avatar';
import './chat_history.css';  // Import the CSS file

const ChatHistory = ({ messages, isAgentThinking }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [messages, isAgentThinking]);

  return (
    <div className="chat-history-panel">
      <div ref={scrollRef} className="chat-history-container">
        {isAgentThinking && (
          <div className="message-container agent">
            <Message
              severity='info'
              content={
                <React.Fragment>
                  <Avatar 
                    icon="pi pi-spin pi-spinner" 
                    size='medium' 
                    shape='circle' 
                    className="avatar"
                  />
                  <div className="message-content">Thinking...</div>
                </React.Fragment>
              }
            />
          </div>
        )}
        {messages.slice().reverse().map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <Message
              severity={message.sender === 'user' ? 'success' : 'info'}
              content={
                <React.Fragment>
                  <Avatar 
                    label={message.sender === 'user' ? "U" : "A"} 
                    size='medium' 
                    shape='circle' 
                    className="avatar"
                  />
                  <div className="message-content">{message.content}</div>
                </React.Fragment>
              }
            />
          </div>
        ))}
      </div>
    </div>
    
  );
};

ChatHistory.displayName = 'ChatHistory'

export { ChatHistory };