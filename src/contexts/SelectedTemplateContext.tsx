import React, { useState } from 'react'

export const selectedTemplateContext = React.createContext({})

function SelectedTemplateContextProvider(props: { children: React.ReactNode }) {

    const [selectedTemplate, setSelectedTemplate] = useState<string>('')

    const values = { selectedTemplate, setSelectedTemplate }

    return (
        <selectedTemplateContext.Provider
            value={values}
        >
            {props.children}
        </selectedTemplateContext.Provider>
    )
}

export default SelectedTemplateContextProvider