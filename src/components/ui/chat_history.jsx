import React from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

const ChatHistoryPanel = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
ChatHistoryPanel.displayName = "ChatHistoryPanel";

const ChatHistory = ({ messages }) => {
  return (
    <ChatHistoryPanel>
      <ScrollPanel style={{ width: '100%', height: '100%' }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </ScrollPanel>
    </ChatHistoryPanel>
  );
};

ChatHistory.displayName = "ChatHistory";

export { ChatHistory };