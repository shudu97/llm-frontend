import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Message } from 'primereact/message';
import { Avatar } from 'primereact/avatar';

const ChatHistoryPanel = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
ChatHistoryPanel.displayName = "ChatHistoryPanel";

const ChatHistory = ({ messages, isAgentThinking }) => {
  return (
    <ChatHistoryPanel>
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        {messages.map((message, index) => (
          <div key={index} style={{display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'}}>
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
              style={{marginBottom: '10px'}}
            />
          </div>
        ))}
        {isAgentThinking && (
          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
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
              style={{marginBottom: '10px'}}
            />
          </div>
        )}
      </ScrollPanel>
    </ChatHistoryPanel>
  );
};

ChatHistory.displayName = "ChatHistory";

export { ChatHistory };