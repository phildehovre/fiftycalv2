import React from 'react'
import EditCampaignForm from '../components/EditCampaignForm'
import Section from '../components/Section'
import { useTemplate } from '../util/db'

function EditCampaignPage() {


    return (
        <Section>
            <EditCampaignForm />
        </Section>
    )
}

export default EditCampaignPage