import React, { useState } from 'react'
import './EditTemplate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import TaskSlice from './TaskSlice'

function EditTemplateForm(props: {
    template: { template_id: string }
}) {

    const [isEditingTask, setIsEditingTask] = useState(false)

    const { template } = props

    const addRow = {}

    const task = { name: 'hey' }

    return (
        <>
            <div className='template_grid-ctn'>
                {
                    isEditingTask
                        ? <TaskSlice template={template} task={task} type='edit' />
                        : <div className='add_task-btn'
                            onClick={() => setIsEditingTask(true)}
                        >New task<span><FontAwesomeIcon icon={faPlusCircle} size={'xl'} /></span></div>
                }
            </div>
        </>
    )
}

export default EditTemplateForm