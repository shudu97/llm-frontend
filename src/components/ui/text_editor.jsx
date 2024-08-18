import { Editor } from "primereact/editor"

const TextEditor = () => {
    return (
        <Editor 
            style={{border: 'none'}} 
            pt={{root: {style: {width: '-webkit-fill-available', height: '96vh'}}}}
        />
    )
}

TextEditor.displayName = "TextEditor"

export { TextEditor };