import React from 'react'
import CreateTaskForm from './CreateTaskForm'

function TaskSlice(props: {
    template: { template_id: string },
    type: string
    task: { name: string | undefined }
}) {

    const { template } = props

    const renderTask = () => {
        if (!props.type) {
            return <div>{props.task?.name}</div>
        }

        return (
            <CreateTaskForm template={template} />
        )
    }


    return (
        <div className='slice-ctn'>
            {renderTask()}
        </div>
    )
}

export default TaskSlice