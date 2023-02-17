import React from 'react'
import { useContext, useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '../App'
import Spinner from './Spinner'
import './CreateTemplateForm.scss'
import { useNavigate } from 'react-router'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { selectedCampaignContext } from '../contexts/SelectedCampaignContext'
import { TaskObj, TemplateObj } from '../types/types'
import DateTimePicker from 'react-datetime-picker'
import { formatTemplateEventsToCampaign } from '../utils/helpers'


const schema = yup.object().shape({
    name: yup.string().required('A name is required'),
    description: yup.string().required('A description is required'),
    template: yup.string().required('You must chose a template'),
})


function CreateCampaignForm(props: {
    templates: TemplateObj[],
    templateEvents: TaskObj[]
}) {
    const { templates, templateEvents } = props
    const { setSelectedTemplateId, selectedTemplateId } = useContext(selectedTemplateContext)
    const { selectedCampaignId, setSelectedCampaignId } = useContext(selectedCampaignContext)

    useEffect(() => {
        if (templates && selectedTemplateId.length === 0) {
            setSelectedTemplateId(templates[0].template_id)
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [targetDate, setTargetDate] = React.useState()
    const session = useSession()
    const navigate = useNavigate()

    //@ts-ignore


    const addCampaign = useMutation({
        mutationFn: async (campaign: any) => await supabase
            .from('campaigns')
            .insert(campaign)
            .select(),
    });


    const addDateToCampaign = (campaign: { targetDate: any, campaign_id: string }) => {
        campaign.targetDate = targetDate
        return campaign
    }

    const copyTemplateEventsToCampaignEvents = useMutation({
        mutationFn: async (templateEvents: TaskObj[]) => {
            await supabase
                .from('campaign_events')
                .insert(templateEvents)
        }
        // ==================Add all template events to campaign events ==============
    })

    const onSubmit = (data: any) => {
        const { template, name, description } = data
        setSelectedTemplateId(template)
        const campaignSansDate = {
            'name': name,
            'description': description,
            'template_id': template,
            'campaign_id': uuidv4(),
            'author_id': session?.user.id
        };

        //@ts-ignore
        const campaign = addDateToCampaign(campaignSansDate)

        addCampaign.mutateAsync(campaign).then((res) => {
            if (res.data !== null) {
                var campaignId = res.data[0].campaign_id
                var templateId = res.data[0].template_id

                sessionStorage.setItem('campaign_id', campaignId)
                sessionStorage.setItem('template_id', templateId)

            }
            return res


        }).then((res) => {
            var campaignId = res.data[0].campaign_id
            setSelectedCampaignId(campaignId)
            console.log(campaignId, 'does it happen here')
            console.log(selectedCampaignId, 'ID from context')
            const templateEventsFormatted = formatTemplateEventsToCampaign(templateEvents, campaignId)
            copyTemplateEventsToCampaignEvents.mutateAsync(templateEventsFormatted).then(res => { })
            navigate(`/campaign/${campaignId}`)

        })
            .catch(err => alert(err))
    };

    return (
        <div>
            <h3>Create campaign: </h3>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='template_form-ctn'>
                <div className='template_form-input-ctn'>
                    <label>Campaign Name:
                        {errors &&
                            //@ts-ignore
                            <p className='form-error-msg'>{errors.name?.message}</p>
                        }
                    </label>
                    <input
                        {...register('name')}
                        name='name'
                        type='text' placeholder='Template name'
                        className='template_form-input'>
                    </input>
                </div>
                <div className='template_form-input-ctn'>
                    <label>Select a template: </label>
                    <select
                        {...register('template')}
                        name='template'
                        className='template_form-input'
                        onChange={(e) => setSelectedTemplateId(e.target.value)}
                    >
                        {templates?.map((e: TemplateObj, i: number) => {
                            return (
                                <option
                                    key={i}
                                    value={e.template_id}
                                >{e.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='template_form-input-ctn'>
                    <label>End date:
                        {errors &&
                            //@ts-ignore
                            <p className='form-error-msg'>{errors.span?.message}</p>
                        }
                    </label>
                    <div className='template_form-input-ctn'>
                        {errors &&
                            //@ts-ignore
                            <p className='form-error-msg'>{errors.date?.message}</p>
                        }
                        <DateTimePicker
                            {...register('targetDate')}
                            onChange={setTargetDate}
                            value={targetDate}
                        />
                    </div>

                </div>
                <div className='template_form-input-ctn'>
                    <label>Description:
                        {errors &&
                            //@ts-ignore
                            <p className='form-error-msg'>{errors.description?.message}</p>
                        }
                    </label>
                    <input
                        {...register('description')}
                        name='description'
                        type='text' placeholder='Template description'
                        className='template_form-input id'
                    ></input>
                </div>
                <button type='submit'>{addCampaign.isLoading ? <Spinner /> : 'Create campaign'}</button>
            </form>
        </div >
    )
}

export default CreateCampaignForm