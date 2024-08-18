import { Editor } from "primereact/editor"
import './text_editor.css'

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