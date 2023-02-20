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
import Spinner from './Spinner'
import Section from './Section'




function EditCampaignForm() {

    const params = useParams()
    const location = useLocation()

    const context = useContext(selectedCampaignContext)

    useEffect(() => {
        if (!context?.selectedCampaignId) {
            context?.setSelectedCampaignId(params.id)
        }
    }, [])


    const { data: campaignData, isLoading: isCampaignLoading, error: campaignError } = useCampaign(context?.selectedCampaignId)
    const { data: campaignEventsData, isLoading: isCampaignEventsLoading, error: campaignEventsError } = useCampaignEvents(context?.selectedCampaignId)

    console.log(campaignData?.data)

    const renderTemplateEvents = () => {
        let templateEventsSorted = campaignEventsData?.data?.sort((a, b) => { return b.position - a.position })
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
        <Section>
            <div className='campaign_flex-ctn'>
                {!isCampaignLoading && campaignData?.data
                    ? <h4>{campaignData?.data.name}</h4>
                    : <Spinner />
                }
                {!isCampaignLoading && campaignData?.data && campaignEventsData?.data &&
                    <>
                        {renderTemplateEvents()}
                        <SubmitCampaignButton targetDate={campaignData?.data.targetDate} events={campaignEventsData?.data} />
                    </>
                }
            </div>
        </Section>
    )
}

export default EditCampaignForm