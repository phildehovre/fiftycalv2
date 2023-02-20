import React, { useState } from 'react'
import { TemplateObj } from '../types/types'

export const selectedTemplateContext = React.createContext<SelectedTemplateInterface>({} as SelectedTemplateInterface)


interface SelectedTemplateInterface {
    selectedTemplateId: string | undefined
    setSelectedTemplateId: (id: string) => void
}

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