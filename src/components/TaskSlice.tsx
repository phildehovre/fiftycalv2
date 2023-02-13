import React from 'react'
import { TaskObj, TemplateObj } from '../types/types'
import CreateTaskForm from './CreateTaskForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner'
import './TaskSlice.scss'

function TaskSlice(props: {
    template: TemplateObj,
    type: string
    task: TaskObj | undefined
}) {

    const { template, task } = props

    const renderCreateTaskButton = () => {
        if (props.type == 'edit') {
            return (
                <CreateTaskForm template={template} />
            )
        }
        if (props.type == 'placeholder') {
            return (
                <Spinner />
            )
        }

        return (
            <div className='slice-ctn'>
                <div className='slice-cell' >{task?.position} {task?.position_units} before</div>
                <div className='slice-cell' >{task?.category}</div>
                <div className='slice-cell' >{task?.description}</div>
                <div className='slice-cell' >{task?.entity_responsible}</div>
                <div className='slice-cell' >{task?.type}</div>
                <button><FontAwesomeIcon icon={faTrash} /></button>
            </div >
        )
    }

    return (
        <>
            {renderCreateTaskButton()}
        </>
    )
}

export default TaskSlice