import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useTemplates } from '../util/db'
import './TemplateList.scss'
import { selectedTemplateContext } from '../contexts/SelectedTemplateContext'

function TemplateList() {



    const { data, isLoading, error } = useTemplates()

    const navigate = useNavigate()
    //@ts-ignore
    const { setSelectedTemplateId } = useContext(selectedTemplateContext)


    const renderTemplateList = () => {
        //@ts-ignore
        return data?.data.map((e, i) => {
            return (
                <div
                    className='template-btn'
                    key={i}
                    onClick={() => {
                        setSelectedTemplateId(e.template_id)
                        navigate(`/template/${e.template_id}`)
                    }}
                >{e.name}
                </div>
            )
        })
    }

    return (
        <div className='template_list-ctn'>
            {!isLoading && data &&
                <>
                    {renderTemplateList()}
                </>
            }
        </div>
    )
}

export default TemplateList