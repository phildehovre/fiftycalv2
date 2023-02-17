import React, { useState } from 'react'
import { TemplateObj } from '../types/types'

export const selectedTemplateContext = React.createContext({})

function SelectedTemplateContextProvider(props: { children: React.ReactNode }) {

    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')

    const values = { selectedTemplateId, setSelectedTemplateId }

    return (
        <selectedTemplateContext.Provider
            value={values}
        >
            {props.children}
        </selectedTemplateContext.Provider>
    )
}

export default SelectedTemplateContextProvider