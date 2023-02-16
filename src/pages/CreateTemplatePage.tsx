import React from 'react'
import CreateTemplateForm from '../components/CreateTemplateForm'
import PageContainer from '../components/PageContainer'
import TemplateList from '../components/TemplateList'

function CreateTemplatePage() {
    return (
        <PageContainer>
            <TemplateList />
            <CreateTemplateForm />
        </PageContainer>
    )
}

export default CreateTemplatePage