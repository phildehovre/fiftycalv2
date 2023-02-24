import React from 'react'
import ColumnHeaders from './ColumnHeaders'
import './EditingHeader.scss '

function EditingHeader(props: any) {
    const { events } = props

    return (
        <div className='editing_header-ctn'>
            <ColumnHeaders events={events} />
        </div>
    )
}

export default EditingHeader