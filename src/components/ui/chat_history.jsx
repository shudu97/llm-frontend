import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Message } from 'primereact/message';
import { Avatar } from 'primereact/avatar';

const ChatHistoryPanel = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
ChatHistoryPanel.displayName = "ChatHistoryPanel";

const ChatHistory = ({ messages }) => {
  return (
    <ChatHistoryPanel>
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        {messages.map((message, index) => (
          <div style={{display: 'flex', "justify-content": `${message.sender === 'user' ? 'end' : 'start'}`}}>
            <Message 
              key={index} 
              severity= {message.sender === 'user' ? 'success' : 'info'}
              // text={message.content}
              content={
                <React.Fragment>
                  <Avatar label={message.sender === 'user' ? "U" : "A"} size='medium' shape='circle' style={{'margin-right': '10px', backgroundColor: '#fff', "min-width": 32}}/>
                  <div style={{lineHeight: '1.5rem'}}>{message.content}</div>
                </React.Fragment>
              }
              style={{'margin-bottom': '10px'}}
            >
            </Message>
          </div>
        ))}
      </ScrollPanel>
    </ChatHistoryPanel>
  );
};

ChatHistory.displayName = "ChatHistory";

export { ChatHistory };