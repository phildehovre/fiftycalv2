
import React, { useState, useEffect } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { TaskObj, TemplateObj } from '../types/types'
import { useTemplateEvents, useTemplate } from '../util/db'
import { useParams } from 'react-router'
import Section from './Section'
import EventSliceRefactor from './EventSliceRefactor'
import Spinner from './Spinner'
import CreateTaskForm from './CreateTaskForm'
import CreateTaskFormRefactor from './CreateTaskFormRefactor'



function EditTemplateFormRefactor(props: {
    template: TemplateObj
}) {

    const [isCreatingTask, setIsCreatingTask] = useState<any>(false)
    const [indexOfEdited, setIndexOfEdited] = React.useState<any>(null)

    const { template } = props

    const params = useParams()

    const {
        data: templateEventsData,
        isLoading: isTemplateEventsLoading,
        error: templateEventsError
    }: any = useTemplateEvents(template?.template_id)

    const renderTemplateEvents = (events: any) => {
        let templateEventsSorted = events?.data?.sort((a: any, b: any) => { return b.position - a.position })
        return templateEventsSorted?.map((e: any, i: number) => {
            return (
                <EventSliceRefactor
                    key={i}
                    event={e}
                    dataTable='template_events'
                />
            )
        })
    }

    return (
        <Section>
            <div className='campaign_flex-ctn'>
                {template
                    ? <h4>{template.name}</h4>
                    : <Spinner />
                }
                {!isTemplateEventsLoading && templateEventsData?.data && template &&
                    <>
                        {renderTemplateEvents(templateEventsData)}
                        {/* <SubmitCampaignButton targetDate={campaignData?.data.targetDate} events={events?.data} /> */}
                    </>
                }
                {isCreatingTask
                    ? <CreateTaskFormRefactor setIsCreatingTask={setIsCreatingTask} />
                    : <button onClick={() => setIsCreatingTask(true)}
                    >{isTemplateEventsLoading.isLoading
                        ? <Spinner />
                        : <div> Add event <FontAwesomeIcon icon={faPlusCircle} /></div>
                        }</button>
                }
            </div>
        </Section>
    )

}

export default EditTemplateFormRefactor