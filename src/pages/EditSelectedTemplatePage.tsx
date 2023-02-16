import React, { useContext, useEffect } from 'react'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { useParams } from 'react-router'
import { useTemplate } from '../util/db'
import Spinner from '../components/Spinner'
import EditTemplateForm from '../components/EditTemplateForm'

function EditSelectedTemplatePage() {

    const context = useContext(selectedTemplateContext)
    const params = useParams()

    const {
        data: templateData,
        isLoading: isTemplateLoading,
        error: templateError
    } = useTemplate(params.id!!)



    useEffect(() => {
        if (templateError) alert(templateError)
    }, [templateError])


    return (
        <div>
            <h2>{templateData?.data.name}</h2>
            {isTemplateLoading && !templateData
                ? <Spinner />
                : <EditTemplateForm template={templateData?.data} />
            }
        </div>

    )
}

export default EditSelectedTemplatePage