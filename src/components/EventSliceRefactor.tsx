import React from 'react'
import { TaskObj } from '../types/types'
import EventCell from './EventCell'
import './EventSlice.scss '
import { convertDaysToUnits } from '../utils/helpers'
import EventCellRefactor from './EventCellRefactor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../App'

function EventSliceRefactor(props: { event: any, dataTable: string }) {

    const { event, dataTable } = props

    const [isHovered, setIsHovered] = React.useState(null)

    const renderEventCells = () => {
        let keys = Object.keys(event)
        return keys.map((k, i) => {
            if (i < 2 || k.includes('id') || k.includes('units')) {
                return
            }
            if (k === 'position') {
                var positionConverted = convertDaysToUnits(event[k], event?.position_units) + ` ${event.position_units}`
                return (
                    <EventCellRefactor
                        units={event.position_units}
                        value={positionConverted}
                        eventId={event.id}
                        key={i}
                        type='number'
                        eventKey={k}
                        dataTable={dataTable}
                    />
                )
            }
            if (k === 'completed') {
                return (
                    <EventCellRefactor
                        value={event[k]}
                        eventId={event.id}
                        key={i}
                        type='checkbox'
                        eventKey={k}
                        dataTable={dataTable}
                    />
                )
            }
            return (
                <EventCellRefactor
                    value={event[k]}
                    eventId={event.id}
                    key={i}
                    type='text'
                    eventKey={k}
                    dataTable={dataTable}
                />

            )
        })
    };

    const queryClient = useQueryClient()

    const deleteTemplateEvent = useMutation({
        mutationFn: async (task: TaskObj) => await supabase
            .from('template_events')
            .delete()
            .eq('id', task.id)
    });


    const handleDeleteTask = (task: TaskObj) => {
        deleteTemplateEvent.mutateAsync(task).then((res) => {
            queryClient.invalidateQueries({ queryKey: ['template_events'] })
        }
        )
    }


    return (
        <>
            <div className='event_slice-ctn'
                onMouseEnter={() => setIsHovered(event.id)}
                onMouseLeave={() => setIsHovered(null)}
            >
                {renderEventCells()}
                {isHovered &&
                    <span className='edit_delete-ctn'>
                        <button className='' ><FontAwesomeIcon icon={faTrash}
                            onClick={() => { handleDeleteTask(event) }}
                        /></button>
                    </span>
                }
            </div>

        </>
    )
}

export default EventSliceRefactor
