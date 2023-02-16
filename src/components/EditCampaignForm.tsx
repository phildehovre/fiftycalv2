import React, { useState, useEffect, useContext } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'
import { TaskObj, TemplateObj } from '../types/types'
import { useCampaign, useTemplateEvents, useTemplate } from '../util/db'
import { useParams } from 'react-router'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { selectedCampaignContext } from '../contexts/SelectedCampaignContext'
import EventSlice from './EventSlice'



function EditCampaignForm() {

    const params = useParams()

    const { selectedTemplateId } = useContext(selectedTemplateContext)
    const { selectedCampaignId } = useContext(selectedCampaignContext)

    let templateId = selectedTemplateId || sessionStorage.getItem('template_id')
    let campaignId = selectedCampaignId || sessionStorage.getItem('campaign_id')

    const { data: campaignData, isLoading: isCampaignLoading, error: campaignError } = useCampaign(campaignId)
    const { data: templateEventsData, isLoading: isTemplateEventsLoading, error: templateEventsError } = useTemplateEvents(templateId)
    const { data: templateData, isLoading: isTemplateLoading, error: templateError } = useTemplate(templateId)


    const renderTemplateEvents = () => {
        let templateEventsSorted = templateEventsData?.data.sort((a, b) => { return b.position - a.position })
        return templateEventsSorted?.map((e: TaskObj, i: number) => {
            return (
                <EventSlice
                    key={i}
                    event={e}
                />
            )
        })
    }

    return (
        <>
            <div className='campaign_flex-ctn'>
                {renderTemplateEvents()}

            </div>
        </>
    )
}

export default EditCampaignForm