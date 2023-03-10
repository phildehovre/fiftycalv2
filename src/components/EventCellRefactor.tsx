import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import './EventSlice.scss '
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../App'
import { entityOptions, typeOptions } from '../assets/selectOptions'

function EventCellRefactor(props: {
    value: string | number | undefined
    units?: string | undefined,
    eventId: string,
    type: string,
    eventKey: string,
    dataTable: string
}) {

    const {
        value,
        eventId,
        type,
        eventKey,
        dataTable
    } = props

    const [edit, setEdit] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm()


    const cellRef: React.MutableRefObject<any> = useRef()

    useEffect(() => {
        window.addEventListener('click', (e) => {
            try {

                if (cellRef.current !== null && !cellRef.current.contains(e.target)) {
                    setEdit(false)
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    }, [])

    const styles: any = () => {
        if (eventKey === 'entity_responsible') {
            let match: { type: string, color: string } | undefined = entityOptions.find((option, i) => {
                return option.type == value
            })

            return { backgroundColor: match?.color }
        }
        if (eventKey === 'type') {
            let match: { type: string, color: string } | undefined = typeOptions.find((option, i) => {
                return option.type == value
            })

            return { backgroundColor: match?.color }
        }
    }


    const handleCellClick = () => {
        setEdit(true)
    }

    const updateCellFn = async ({ id, key, val }: any) => {
        console.log(id, key, val)
        return await supabase
            .from(dataTable)
            .update({ [key]: val })
            .eq('id', id)
    }

    const updateCell = useMutation({
        mutationFn: ({ id, key, val }: any) => updateCellFn({ id, key, val }),
    })

    const onSubmit = (formData: any) => {
        console.log(formData)
        let keys = Object.keys(formData)
        let key = keys[0]
        let value = formData[key]
        updateCell.mutateAsync({ id: eventId, key: key, val: value }).then((res) => {
            queryClient.invalidateQueries({ queryKey: [dataTable] })
        }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} ref={cellRef}
                onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => { setIsHovered(false) }}
                className={`slice-cell`}
                style={styles()}>
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
            </form >
        </>
    )
}

export default EventCellRefactor