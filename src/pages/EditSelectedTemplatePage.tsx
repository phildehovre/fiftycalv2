import React, { useContext, useEffect } from 'react'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { useParams } from 'react-router'
import { useTemplate, useTemplateEvents } from '../util/db'
import Spinner from '../components/Spinner'
import EditTemplateForm from '../components/EditTemplateForm'
import Section from '../components/Section'
import EditTemplateFormRefactor from '../components/EditTemplateFormRefactor'

function EditSelectedTemplatePage() {

    const context = useContext(selectedTemplateContext)
    const params = useParams()

    const {
        data: templateData,
        isLoading: isTemplateLoading,
        error: templateError
    } = useTemplate(params.id!!)

    const {
        data: templateEventsData,
        isLoading: isTemplateEventsLoading,
        error: templateEventsError
    } = useTemplateEvents(templateData?.data.template_id)

    useEffect(() => {
        if (templateError) alert(templateError)
    }, [templateError])


    return (
        <Section>
            {/* <h2>{templateData?.data.name}</h2> */}
            {isTemplateEventsLoading && !templateData
                ? <Spinner />
                // : <EditTemplateForm template={templateData?.data} />
                : <EditTemplateFormRefactor template={templateData?.data} />
            }
        </Section>

    )
}

export default EditSelectedTemplatePage