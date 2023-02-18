import React, { useState, useEffect, useContext } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'
import { TaskObj, TemplateObj } from '../types/types'
import { useCampaign, useTemplateEvents, useTemplate, useCampaignEvents } from '../util/db'
import { useParams, useLocation, useMatch } from 'react-router'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { selectedCampaignContext } from '../contexts/SelectedCampaignContext'
import EventSlice from './EventSlice'
import SubmitCampaignButton from './SubmitCampaignButton'
import dayjs from 'dayjs'




function EditCampaignForm() {

    const params = useParams()
    const location = useLocation()

    const { selectedTemplateId } = useContext(selectedTemplateContext)
    const { selectedCampaignId, setSelectedCampaignId } = useContext(selectedCampaignContext)

    useEffect(() => {
        if (!selectedCampaignId) {
            setSelectedCampaignId(params.id)
        }
    }, [])


    let templateId = selectedTemplateId || sessionStorage.getItem('template_id')
    let campaignId = selectedCampaignId || params.id

    const { data: campaignData, isLoading: isCampaignLoading, error: campaignError } = useCampaign(campaignId)
    const { data: campaignEventsData, isLoading: isCampaignEventsLoading, error: campaignEventsError } = useCampaignEvents(campaignId)
    const { data: templateEventsData, isLoading: isTemplateEventsLoading, error: templateEventsError } = useTemplateEvents(templateId)
    const { data: templateData, isLoading: isTemplateLoading, error: templateError } = useTemplate(templateId)


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
                <SubmitCampaignButton targetDate={campaignData?.data.targetDate} events={campaignEventsData?.data} />
            </div>
        </>
    )
}

export default EditCampaignForm