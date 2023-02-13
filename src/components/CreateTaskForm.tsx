import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../App'
import Spinner from './Spinner'
import './CreateTemplateForm.scss'
import './TaskSlice.scss'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { TemplateObj } from '../types/types'


const schema = yup.object().shape({
    position: yup.number().min(1).required('A duration is required'),
    position_units: yup.string().required('A duration is required'),
    category: yup.string().required('Please chose a category'),
    description: yup.string().required('A description is required'),
    entity_responsible: yup.string().required('Select a responsible entity'),
    type: yup.string().required('Select a type of task'),
})

function CreateTaskForm(props: {
    template: TemplateObj,
}) {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const queryClient = useQueryClient()


    const session = useSession()
    const navigate = useNavigate()

    const addTemplateEvent = useMutation({
        mutationFn: async (event: any) => await supabase
            .from('template_events')
            .insert(event)
            .select(),
    });

    const onSubmit = (data: any) => {
        console.log(data)
        const { position, type, category, entity_responsible, description, position_units } = data
        const event = {
            'position': position,
            'position_units': position_units,
            'category': category,
            'description': description,
            'entity_responsible': entity_responsible,
            'type': type,
            'template_id': props.template.template_id,
            'author': session?.user.id,
        };
        addTemplateEvent.mutateAsync(event).then((res) => {
            queryClient.invalidateQueries({ queryKey: ['template_events'] })
        }).catch(err => alert(err))
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='task_form-ctn'>
                <div className='task_form-input-ctn'>
                    <span>
                        <input className={`task_form-input ${errors.position ? 'error' : ''}`}
                            {...register('position')}
                            name='position'
                            defaultValue='50'
                            type='number'
                            placeholder='50'
                            min='1'
                            max='100'
                        ></input>
                        <select
                            {...register('position_units')}
                            name='position_units'
                            className='task_form-input'
                        >
                            <option value='days'>Days before</option>
                            <option value='weeks'>Week(s) before</option>
                            <option value='months'>Month(s) before</option>
                        </select>
                    </span>
                </div>
                <div className='task_form-input-ctn'>
                    <input className={`task_form-input ${errors.category ? 'error' : ''}`}
                        {...register('category')}
                        name='category'
                        type='text' placeholder='Category'>
                    </input>
                </div>

                <div className='task_form-input-ctn'>
                    <input
                        {...register('description')}
                        name='description'
                        type='text' placeholder='Task description'
                        className={`task_form-input ${errors.description ? 'error' : ''}`}
                    ></input>
                </div>
                <div className='task_form-input-ctn'>
                    <select
                        {...register('entity_responsible')}
                        name='entity_responsible'
                        className={`task_form-input ${errors.entity_responsible ? 'error' : ''}`}
                    >
                        <option value='supplier'>Supplier</option>
                        <option value='label'>Label</option>
                        <option value='pr'>PR</option>
                        <option value='distributor'>Distributor</option>
                        <option value='artist-bedmar'>Artist & Bedmar</option>
                        <option value='artist'>Artist</option>
                    </select>
                </div>
                <div className='task_form-input-ctn'>
                    <select
                        {...register('type')}
                        name='type'
                        className='task_form-input'
                    >
                        <option value='action'>Action</option>
                        <option value='creative'>Creative</option>
                        <option value='pr-radio'>PR + Radio</option>
                        <option value='promotion'>Promotion</option>
                        <option value='announcement'>Announcement</option>
                    </select>
                </div>
                <button type='submit'>{addTemplateEvent.isLoading ? <Spinner /> : <FontAwesomeIcon icon={faPlusSquare} />}</button>
            </form>
        </div >
    )
}

export default CreateTaskForm