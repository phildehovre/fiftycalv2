import React from 'react'
import EditCampaignForm from '../components/EditCampaignForm'
import { useTemplate } from '../util/db'

function EditCampaignPage() {



    const { data, isLoading, error } = useTemplate()

    return (
        <div>EditCampaignPage
            <EditCampaignForm />
        </div>
    )
}

export default EditCampaignPage