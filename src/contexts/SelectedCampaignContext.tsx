import React, { useEffect, useState } from 'react'
import { CampaignObj } from '../types/types'

export const selectedCampaignContext = React.createContext({} as SelectedCampaignInterface)

interface SelectedCampaignInterface {
    selectedCampaignId: string
    setSelectedCampaignId: (id: string | undefined) => void
}

function SelectedCampaignContextProvider(props: { children: React.ReactNode }) {

    const [selectedCampaignId, setSelectedCampaignId] = useState('')

    const values = { selectedCampaignId, setSelectedCampaignId }

    return (
        <selectedCampaignContext.Provider
            value={values}
        >
            {props.children}
        </selectedCampaignContext.Provider>
    )
}

export default SelectedCampaignContextProvider