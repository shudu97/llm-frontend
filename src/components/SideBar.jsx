import React from 'react';
import { Button } from 'primereact/button';
import './styles/SideBar.css';

export const Sidebar = ({ setActivePanel }) => {
  return (
    <div className="sidebar">
      <Button 
        icon="pi pi-comments" 
        className="p-button-text" 
        onClick={() => setActivePanel('chat')} 
        tooltip="Chat"
      />
      <Button 
        icon="pi pi-history" 
        className="p-button-text" 
        onClick={() => setActivePanel('history')} 
        tooltip="Chat History"
      />
      <Button 
        icon="pi pi-folder" 
        className="p-button-text" 
        onClick={() => setActivePanel('files')} 
        tooltip="File Management"
      />
    </div>
  );
};