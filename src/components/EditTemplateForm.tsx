import React, { useState, useEffect } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'
import { TaskObj, TemplateObj } from '../types/types'
import { useTemplateEvents } from '../util/db'



function EditTemplateForm(props: {
    template: TemplateObj
}) {

    const [isCreatingTask, setIsCreatingTask] = useState(false)
    const [indexOfEdited, setIndexOfEdited] = React.useState()

    const { template } = props

    const {
        data: templateEventsData,
        isLoading: isTemplateEventsLoading,
        error: templateEventsError
    } = useTemplateEvents(template.template_id)


    const renderTemplateEvents = () => {
        let templatesSorted = templateEventsData?.data?.sort((a, b) => { return b.position - a.position })
        return templatesSorted?.map((e, i) => {
            return (
                <TaskSlice
                    task={e}
                    key={i}
                    template={template}
                    type={'data'}
                    taskIndex={i}
                    indexOfEdited={indexOfEdited}
                    //@ts-ignore
                    setIndexOfEdited={setIndexOfEdited}
                />
            )
        })
    }


    return (
        <>
            <div className='template_flex-ctn'>
                <>{
                    //@ts-ignore
                    templateEventsData?.data.length === 0 && !isCreatingTask &&
                    <h4>Add the first task</h4>
                }
                    {
                        isTemplateEventsLoading
                            //@ts-ignore
                            ? <TaskSlice task={undefined} task={templateEventsData?.data[indexOfEdited]} template={template} type='placeholder' />
                            : renderTemplateEvents()
                    }
                    {
                        isCreatingTask
                            ? <TaskSlice template={template} type='create'
                                setIscreatingTask={setIsCreatingTask}
                                //@ts-ignore
                                setIndexOfEdited={setIndexOfEdited}
                            />
                            : <div className='add_task-btn'
                                onClick={() => setIsCreatingTask(true)}
                            >Add task<span><FontAwesomeIcon icon={faPlusCircle} size={'xl'} /></span></div>
                    }
                </>
            </div>
        </>
    )
}

export default EditTemplateForm