import React, { useCallback, useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { PromptInput } from "./ui/prompt_input";
import { ChatHistory } from "./ui/chat_history";
import { ResetChatButton } from './ui/reset_chat_button';
import './styles/ChatApp.css';

const ChatApp = ({ onEditorUpdate, chatState, setChatState }) => {
  const { messages, inputMessage, isAgentThinking, streamingMessage } = chatState;
  const eventSourceRef = useRef(null);
  const hasReceivedResponse = useRef(false);
  const editorContentRef = useRef('');

  const sendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    setChatState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, { content: inputMessage, sender: 'user' }],
      inputMessage: '',
      isAgentThinking: true,
      streamingMessage: ''
    }));
    hasReceivedResponse.current = false;
    editorContentRef.current = '';

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    eventSourceRef.current = new EventSource(`http://localhost:8000/chat?message=${encodeURIComponent(inputMessage)}`);

    eventSourceRef.current.onmessage = (event) => {
      const { content, toEditor, isNotification } = JSON.parse(event.data);
      if (toEditor) {
        editorContentRef.current += content;
        if (content.endsWith('.')) {
          onEditorUpdate(editorContentRef.current);
          editorContentRef.current = '';
        }
      } else if (isNotification) {
        setChatState(prevState => ({
          ...prevState,
          messages: [...prevState.messages, { content, sender: 'agent' }]
        }));
      } else {
        setChatState(prevState => ({
          ...prevState,
          streamingMessage: prevState.streamingMessage + content,
          isAgentThinking: false
        }));
      }
      hasReceivedResponse.current = true;
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSourceRef.current.close();
      setChatState(prevState => ({
        ...prevState,
        isAgentThinking: false,
        messages: hasReceivedResponse.current ? prevState.messages : [...prevState.messages, { content: "Sorry, there was an error processing your message.", sender: 'agent' }]
      }));
    };

    eventSourceRef.current.onopen = () => {
      setChatState(prevState => ({ ...prevState, isAgentThinking: true }));
    };
  }, [inputMessage, onEditorUpdate, setChatState]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (streamingMessage) {
      setChatState(prevState => {
        const newMessages = [...prevState.messages];
        if (newMessages[newMessages.length - 1]?.sender === 'agent') {
          newMessages[newMessages.length - 1].content = streamingMessage;
        } else {
          newMessages.push({ content: streamingMessage, sender: 'agent' });
        }
        return { ...prevState, messages: newMessages };
      });
    }
  }, [streamingMessage, setChatState]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

    // New function to reset the chat
  const resetChat = async () => {
    // Close the existing EventSource if it's open
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Call the backend to reset the chat
    try {
      const response = await fetch('http://localhost:8000/reset-chat', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to reset chat on the server');
      }
    } catch (error) {
      console.error('Error resetting chat:', error);
      // You might want to show an error message to the user here
    }

    // Reset the local state
    setChatState({
      messages: [],
      inputMessage: '',
      isAgentThinking: false,
      streamingMessage: ''
    });

    // Clear the editor content
    onEditorUpdate('');
    
    // Reset other refs
    hasReceivedResponse.current = false;
    editorContentRef.current = '';
  };

  return (
    <div className="chat-app-panel">
      <Menubar 
        start={
          <h3>Model Document Agent</h3>
        }
        end={
          <ResetChatButton 
            onClick={resetChat} 
          />
        }
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none' }}
      />
      <ChatHistory 
        messages={messages} 
        isAgentThinking={isAgentThinking} 
        streamingMessage={streamingMessage}
      />
      <div className="flex items-center p-6 pt-0">
        <form onSubmit={sendMessage} className="w-full">
          <PromptInput
            value={inputMessage}
            onChange={(e) => setChatState(prevState => ({ ...prevState, inputMessage: e.target.value }))}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatApp;