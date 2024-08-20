import React, { useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ChatApp from './components/ChatApp';
import { TextEditor } from './components/TextEditor';
import { Sidebar } from './components/SideBar';
import './App.css';

function App() {
  const [editorContent, setEditorContent] = useState('');
  const [activePanel, setActivePanel] = useState('chat');

  const renderLeftPanel = () => {
    switch (activePanel) {
      case 'chat':
        return <ChatApp onEditorUpdate={setEditorContent} />;
      case 'history':
        return <div>Chat History Placeholder</div>;
      case 'files':
        return <div>File Management Placeholder</div>;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setActivePanel={setActivePanel} />
      <div className="main-content">
        <Splitter style={{ height: '100vh' }}>
          <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
            {renderLeftPanel()}
          </SplitterPanel>
          <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={10}>
            <TextEditor value={editorContent} onChange={setEditorContent} />
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  );
}

export default App;