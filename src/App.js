import React from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import ChatApp from './components/ChatApp';
import { TextEditor } from './components/TextEditor';

function App() {
  return (
    <div className="App">
      <Splitter style={{ height: '100vh'}} pt={{'gutterHandler': {style: {display: 'none'}}}}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
          <ChatApp />  
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={75} minSize={10}>
          <TextEditor />
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
