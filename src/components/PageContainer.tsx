import React from 'react'
import './PageContainer.scss '

function PageContainer(props: { children: React.ReactNode }) {
    return (
        <div className='page_container'>
            {props.children}
        </div>
    )
}

export default PageContainer