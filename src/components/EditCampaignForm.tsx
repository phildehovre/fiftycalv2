import React, { useState, useEffect, useContext } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'
import { TaskObj, TemplateObj } from '../types/types'
import { useCampaign, useTemplateEvents, useTemplate, useCampaignEvents } from '../util/db'
import { useParams } from 'react-router'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { selectedCampaignContext } from '../contexts/SelectedCampaignContext'
import EventSlice from './EventSlice'




function EditCampaignForm() {

    const params = useParams()

    const { selectedTemplateId } = useContext(selectedTemplateContext)
    const { selectedCampaignId } = useContext(selectedCampaignContext)

    let templateId = selectedTemplateId || sessionStorage.getItem('template_id')
    let campaignId = selectedCampaignId

    const { data: campaignData, isLoading: isCampaignLoading, error: campaignError } = useCampaign(campaignId)
    const { data: campaignEventsData, isLoading: isCampaignEventsLoading, error: campaignEventsError } = useCampaignEvents(campaignId)
    const { data: templateEventsData, isLoading: isTemplateEventsLoading, error: templateEventsError } = useTemplateEvents(templateId)
    const { data: templateData, isLoading: isTemplateLoading, error: templateError } = useTemplate(templateId)

    console.log(campaignEventsData?.data)
    console.log(campaignData?.data)

    const renderTemplateEvents = () => {
        let templateEventsSorted = campaignEventsData?.data.sort((a, b) => { return b.position - a.position })
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