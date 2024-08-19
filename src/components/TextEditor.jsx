import { Editor } from "primereact/editor"
import './styles/TextEditor.css'

const TextEditor = ({ value, onChange }) => {
    return (
        <Editor 
            value={value}
            onTextChange={(e) => onChange(e.htmlValue)}
            style={{border: 'none'}} 
            pt={{root: {className: 'text-editor-root'}}}
        />
    )
}

TextEditor.displayName = "TextEditor"

export { TextEditor };