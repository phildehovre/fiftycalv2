import React from 'react'
import { useState, useContext } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../App'
import Spinner from './Spinner'


const schema = yup.object().shape({
    name: yup.string().required('A name is required for the template'),
    description: yup.string().required('A description is required for the template'),
    span: yup.number().required('A duration is required'),
    permissions: yup.string().required('Select a permission level'),
})

function CreateEventForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const session = useSession()

    const addTemplate = useMutation({
        mutationFn: async (event: any) => await supabase
            .from('templates')
            .insert(event)
            .select(),
    });

    const onSubmit = (data: any) => {
        const { name, description, span, permissions } = data
        const event = {
            'name': name,
            'description': description,
            'span': span,
            'permissions': permissions,
            'template_id': uuidv4(),
            'author': session?.user.id
        };
        addTemplate.mutateAsync(event).then(() => {

        })
    };

    console.log(addTemplate.data)
    return (
        <div>
            <h3>Create event: </h3>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
                {/* <label className='form-error'>{errors.firstName?.message}</label> */}
                <label>Duration of the template</label>
                {errors &&
                    //@ts-ignore
                    <p className='form-error-msg'>{errors.span?.message}</p>
                }
                <div>
                    <input
                        {...register('span')}
                        name='span'
                        type='number'
                        placeholder='30'
                        min='1'
                        max='100'
                    ></input><span> day(s)</span>
                </div>
                <label>Name</label>
                {errors &&
                    //@ts-ignore
                    <p className='form-error-msg'>{errors.name?.message}</p>
                }
                <input
                    {...register('name')}
                    name='name'
                    type='text' placeholder='Template name'></input>
                <label>Description</label>
                {errors &&
                    //@ts-ignore
                    <p className='form-error-msg'>{errors.description?.message}</p>
                }
                <input
                    {...register('description')}
                    name='description'
                    type='text' placeholder='Template description'></input>
                <label>Who can edit this template</label>
                <select
                    {...register('permissions')}
                    name='permissions'
                >
                    <option value={session?.user.id}>Myself</option>
                    <option value='user'>Members</option>
                    <option value='admin'>Admins</option>
                </select>
                <button type='submit'>{addTemplate.isLoading ? <Spinner /> : 'Create template'}</button>
            </form>
        </div>
    )
}

export default CreateEventForm