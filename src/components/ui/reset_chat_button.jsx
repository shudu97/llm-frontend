import { Button } from "primereact/button";



const ResetChatButton = ({ onClick }) => {
    return (
        <Button 
            onClick={onClick}
            icon="pi pi-pen-to-square" 
            rounded
            text
            severity="secondary"
            aria-label="Reset Chat"
        />
    )
}

ResetChatButton.displayName = "ResetChatButton"
export { ResetChatButton };