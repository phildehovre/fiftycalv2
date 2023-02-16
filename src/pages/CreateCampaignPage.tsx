import React, { useContext, useEffect } from 'react'
import CreateCampaignForm from '../components/CreateCampaignForm'
import PageContainer from '../components/PageContainer'
import Spinner from '../components/Spinner'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { useTemplates, useTemplateEvents } from '../util/db'

function CreateCampaignPage() {

    const { data, isLoading, error } = useTemplates()

    const { selectedTemplateId } = useContext(selectedTemplateContext)

    var { data: templateEventsData } = useTemplateEvents(selectedTemplateId)

    return (
        <PageContainer>
            New Campaign:

            {isLoading && !data && !selectedTemplateId
                ? <Spinner />
                : <CreateCampaignForm templates={data?.data} templateEvents={templateEventsData?.data} />
            }
        </PageContainer>
    )
}

export default CreateCampaignPage