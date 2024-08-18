import React, { useRef, useEffect } from 'react';
import { Message } from 'primereact/message';
import { Avatar } from 'primereact/avatar';

const ChatHistory = ({ messages, isAgentThinking }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [messages, isAgentThinking]);

  return (
    <div 
      ref={scrollRef}
      style={{
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        maxHeight: '100%',
        scrollbarWidth: 'none',  // For Firefox
        msOverflowStyle: 'none',  // For Internet Explorer and Edge
      }}
    >
      <style>
        {`
          /* For Webkit browsers like Chrome/Safari/Opera */
          .chat-history::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {isAgentThinking && (
        <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '10px'}}>
          <Message
            severity='info'
            content={
              <React.Fragment>
                <Avatar 
                  icon="pi pi-spin pi-spinner" 
                  size='medium' 
                  shape='circle' 
                  style={{marginRight: '10px', backgroundColor: '#fff', minWidth: 32}}
                />
                <div style={{lineHeight: '1.5rem'}}>Thinking...</div>
              </React.Fragment>
            }
          />
        </div>
      )}
      {messages.slice().reverse().map((message, index) => (
        <div key={index} style={{display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px'}}>
          <Message
            severity={message.sender === 'user' ? 'success' : 'info'}
            content={
              <React.Fragment>
                <Avatar 
                  label={message.sender === 'user' ? "U" : "A"} 
                  size='medium' 
                  shape='circle' 
                  style={{marginRight: '10px', backgroundColor: '#fff', minWidth: 32}}
                />
                <div style={{lineHeight: '1.5rem'}}>{message.content}</div>
              </React.Fragment>
            }
          />
        </div>
      ))}
    </div>
  );
};

export { ChatHistory };