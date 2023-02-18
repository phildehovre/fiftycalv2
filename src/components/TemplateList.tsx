import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useTemplates, useCampaigns } from '../util/db'
import './TemplateList.scss'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { TemplateObj } from '../types/types'

function TemplateList() {



    const { data: templatesData, isTemplatesLoading, templatesError } = useTemplates()
    const { data: campaignsData, isCampaignsLoading, campaignsError } = useCampaigns()

    const navigate = useNavigate()
    //@ts-ignore
    const { setSelectedTemplateId } = useContext(selectedTemplateContext)


    const renderList = (data: any, type: string) => {
        //@ts-ignore
        return data.map((e, i) => {
            return (
                <div
                    className='template-btn'
                    key={i}
                    onClick={() => {
                        if (type === 'template') {
                            setSelectedTemplateId(e.template_id)
                            navigate(`/${type}/${e.template_id}`)
                        }
                        if (type === 'campaign') {
                            setSelectedTemplateId(e.template_id)
                            navigate(`/${type}/${e.campaign_id}`)
                        }
                    }}
                >{e.name}
                </div>
            )
        })
    }

    return (
        <div className='template_list-ctn'>
            <h3 style={{ borderBottom: '1px solid darkgrey' }}>Templates</h3>
            {!isTemplatesLoading && templatesData &&
                <>
                    {renderList(templatesData.data, 'template')}
                </>
            }
            <h3 style={{ borderBottom: '1px solid darkgrey' }}>Campaigns</h3>
            {
                !isCampaignsLoading && campaignsData &&
                <>
                    {renderList(campaignsData.data, 'campaign')}
                </>
            }
        </div>
    )
}

export default TemplateList