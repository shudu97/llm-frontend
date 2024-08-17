import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "primereact/button";

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
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="text-2xl font-bold text-center">Chat App</CardHeader>
      <CardContent className="h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.content}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <form onSubmit={sendMessage} className="w-full">
          <div className='p-inputgroup flex-1'>
            <Input
              type="textarea"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow mr-2"
              placeholder="Type a message"
            />
            <Button
              icon="pi pi-send"
              className="p-button-rounded"
              aria-label="Send"
              type="submit"
            />
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatApp;