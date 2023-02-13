import React, { useContext, useEffect } from 'react'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { useParams } from 'react-router'
import { useTemplate } from '../util/db'
import Spinner from '../components/Spinner'
import EditTemplateForm from '../components/EditTemplateForm'

function EditSelectedTemplatePage() {

    const context = useContext(selectedTemplateContext)
    const params = useParams()

    const { data, isLoading, error } = useTemplate(params.id!!)

    useEffect(() => {
        if (error) alert(error)
    }, [error])


    return (
        <>
            {isLoading && !data
                ? <Spinner />
                : <EditTemplateForm template={data?.data} />
            }
        </>

    )
}

export default EditSelectedTemplatePage