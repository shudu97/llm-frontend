import * as React from "react"
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "primereact/button"

const PromptInput = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
      <div className="p-inputgroup flex-1">
        <InputTextarea
          className={`flex ${className}`}
          ref={ref}
          rows={1}
          autoResize
          {...props}
        />
        <Button
          icon="pi pi-send"
          aria-label="Send"
          type="submit"
        />
      </div>
    )
})

PromptInput.displayName = "PromptInput"

export { PromptInput }