import React, { useContext, useEffect } from 'react'
import CreateCampaignForm from '../components/CreateCampaignForm'
import PageContainer from '../components/PageContainer'
import Section from '../components/Section'
import Spinner from '../components/Spinner'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { useTemplates, useTemplateEvents } from '../util/db'

function CreateCampaignPage() {

    const { data, isLoading, error } = useTemplates()

    const { selectedTemplateId } = useContext(selectedTemplateContext)

    var { data: templateEventsData } = useTemplateEvents(selectedTemplateId)

    return (
        <Section>
            {isLoading && !data && !selectedTemplateId
                ? <Spinner />
                : <CreateCampaignForm templates={data?.data} templateEvents={templateEventsData?.data} />
            }
        </Section>
    )
}

export default CreateCampaignPage