import React from 'react'
import './ColumnHeaders.scss'
import EventCell from './EventCell'

function ColumnHeaders(props: any) {

    const { headers } = props

    const omittedHeaders = [
        'id', 'created_at', 'author_id', 'position_units', 'template_id'
    ]

    const renderHeaders = () => {
        return headers.map((header: string, i: number) => {
            if (!omittedHeaders.includes(header)) {

                return (
                    <div className='header'
                    >{header.split('_').join(' ')}</div >
                )
            }
        })
    }

    return (
        <div
            className='headers-ctn'
        >{renderHeaders()}</div>
    )
}

export default ColumnHeaders