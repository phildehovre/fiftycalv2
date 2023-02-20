import React, { useEffect, useState } from 'react'
import { CampaignObj } from '../types/types'

export const selectedCampaignContext = React.createContext({})

function SelectedCampaignContextProvider(props: { children: React.ReactNode }) {

    const [selectedCampaignId, setSelectedCampaignId] = useState<string>('')

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