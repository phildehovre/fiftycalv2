import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useTemplates, useCampaigns } from '../util/db'
import './TemplateList.scss'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'
import { TemplateObj } from '../types/types'
import { selectedCampaignContext } from '../contexts/SelectedCampaignContext'

function TemplateList() {


    const { data: templatesData, isLoading: isTemplatesLoading, error: templatesError } = useTemplates()
    const { data: campaignsData, isLoading: isCampaignsLoading, error: campaignsError } = useCampaigns()

    const navigate = useNavigate()
    //@ts-ignore
    const { setSelectedTemplateId } = useContext(selectedTemplateContext)
    //@ts-ignore
    const { setSelectedCampaignId } = useContext(selectedCampaignContext)


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
                            setSelectedCampaignId(e.campaign_id)
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
            <h3 >Templates</h3>
            {!isTemplatesLoading && templatesData &&
                <>
                    {renderList(templatesData.data, 'template')}
                </>
            }
            <h3 >Campaigns</h3>
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