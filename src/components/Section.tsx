import React from 'react'
import './Section.scss'

function Section(props: { children: React.ReactNode }) {
    return (
        <div className='section-ctn'>{props.children}</div>
    )
}

export default Section