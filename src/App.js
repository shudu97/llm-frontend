import React, { useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ChatApp from './components/ChatApp';
import { TextEditor } from './components/TextEditor';

function App() {
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="App">
      <Splitter style={{ height: '100vh'}} pt={{'gutterHandler': {style: {display: 'none'}}}}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
          <ChatApp onEditorUpdate={setEditorContent} />  
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={10}>
          <TextEditor value={editorContent} onChange={setEditorContent} />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;