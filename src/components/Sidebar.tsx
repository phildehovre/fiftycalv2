import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Sidebar.scss'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import TemplateList from './TemplateList'

function Sidebar() {



    return (
        <div className='sidebar-ctn'>
            <FontAwesomeIcon
                className='sidebar-btn'
                icon={faLayerGroup}
            />
            <TemplateList />

        </div>
    )
}

export default Sidebar