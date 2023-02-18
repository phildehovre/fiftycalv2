import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import './EventSlice.scss'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../App'

function EventCell(props: {
    value: string | number | undefined
    units?: string | undefined,
    eventId: string,
    type: string,
    eventKey: string
}) {

    const {
        value,
        eventId,
        type,
        eventKey
    } = props

    const [edit, setEdit] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm()


    const cellRef: React.MutableRefObject<object | undefined> = useRef()

    useEffect(() => {
        window.addEventListener('click', (e) => {
            try {
                //@ts-ignore
                if (cellRef.current !== null && !cellRef.current.contains(e.target)) {
                    setEdit(false)
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    }, [])


    const handleCellClick = () => {
        setEdit(true)
    }

    const updateCellFn = async ({ id, key, val }) => {
        console.log(id, key, val)
        return await supabase
            .from('campaign_events')
            .update({ [key]: val })
            .eq('id', id)
    }

    const updateCell = useMutation({
        mutationFn: ({ id, key, val }) => updateCellFn({ id, key, val }),
    })

    const onSubmit = (formData: any) => {
        console.log(formData)
        let keys = Object.keys(formData)
        let key = keys[0]
        let value = formData[key]
        console.log(value)
        updateCell.mutateAsync({ id: eventId, key: key, val: value }).then((res) => {
            queryClient.invalidateQueries({ queryKey: ['campaign_events'] })
        }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} ref={cellRef}
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}
                className={`slice-cell`}>
                {
                    isHovered &&
                    <button className='slice-cell-btn' onClick={() => { handleCellClick() }}><FontAwesomeIcon icon={faPencil} /></button>
                }
                {edit
                    ? <input type={type}
                        defaultValue={value}
                        {...register(eventKey)}
                    ></input>
                    : eventKey === 'completed'
                        ? <input type='checkbox'
                            {...register('completed')}
                            defaultValue={value}></input>
                        : <div>{value}</div>
                }
            </form>
        </>
    )
}

export default EventCell