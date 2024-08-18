import { Editor } from "primereact/editor"
import './styles/TextEditor.css'

const TextEditor = () => {
    return (
        <Editor 
            style={{border: 'none'}} 
            pt={{root: {className: 'text-editor-root'}}}
        />
    )
}

TextEditor.displayName = "TextEditor"

export { TextEditor };