import React from 'react'
import EditCampaignForm from '../components/EditCampaignForm'
import Section from '../components/Section'
import { useTemplate } from '../util/db'
import EditingHeader from '../components/EditingHeader'

function EditCampaignPage() {


    return (
        <Section>
            <EditingHeader />
            <EditCampaignForm />
        </Section>
    )
}

export default EditCampaignPage