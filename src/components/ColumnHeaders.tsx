import React, { useEffect, useState } from 'react'
import './ColumnHeaders.scss'
import EventCell from './EventCell'

function ColumnHeaders(props: any) {

    const { events } = props

    const [headers, setHeaders] = useState<any>()

    useEffect(() => {
        events.length > 0 ? setHeaders(Object.keys(events[0])) : setHeaders(placeHolders)
    }, [events])

    const omittedHeaders = [
        'id', 'created_at', 'author_id', 'position_units', 'template_id'
    ]
    const placeHolders = [
        'Position', 'Description', 'Category', 'Type', 'Entity Responsible'
    ]

    const renderHeaders = () => {
        return headers?.map((header: string, i: number) => {
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