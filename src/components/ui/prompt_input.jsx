import * as React from "react"
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from "primereact/button"

const PromptInput = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
      <div className="p-inputgroup flex-1">
        <InputTextarea
          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          rows={1}
          autoResize
          {...props}
        />
        <Button
          icon="pi pi-send"
          className="p-button-rounded"
          aria-label="Send"
          type="submit"
        />
      </div>
    )
})

PromptInput.displayName = "PromptInput"

export { PromptInput }