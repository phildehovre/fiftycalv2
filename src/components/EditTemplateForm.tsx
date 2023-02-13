import React, { useState, useEffect } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'
import { TaskObj, TemplateObj } from '../types/types'
import { useTemplateEvents } from '../util/db'
import { useQueryClient } from '@tanstack/react-query'


function EditTemplateForm(props: {
    template: TemplateObj
}) {

    const [isEditingTask, setIsEditingTask] = useState(false)

    const { template } = props

    const queryClient = useQueryClient()

    const {
        data: templateEventsData,
        isLoading: isTemplateEventsLoading,
        error: templateEventsError
    } = useTemplateEvents(template.template_id)


    const renderTemplateEvents = () => {
        return templateEventsData?.data.map((e, i) => {
            return (
                <TaskSlice
                    task={e}
                    key={i}
                    template={template}
                    type={'data'}
                />
            )
        })
    }


    return (
        <>
            <div className='template_flex-ctn'>
                <>
                    {
                        isTemplateEventsLoading
                            ? <TaskSlice task={undefined} template={template} type='placeholder' />
                            : renderTemplateEvents()
                    }
                    {
                        isEditingTask
                            ? <TaskSlice template={template} task={undefined} type='edit' />
                            : <div className='add_task-btn'
                                onClick={() => setIsEditingTask(true)}
                            >New task<span><FontAwesomeIcon icon={faPlusCircle} size={'xl'} /></span></div>
                    }
                </>
            </div>
        </>
    )
}

export default EditTemplateForm