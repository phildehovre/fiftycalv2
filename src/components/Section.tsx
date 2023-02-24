import React from 'react'
import './Section.scss'

function Section(props: {
    children: React.ReactNode
    flexDirection?: string | undefined
    display?: string
    height?: string

}) {

    const { flexDirection, display, height } = props

    const styles: object = {
        flexDirection: flexDirection,
        display: display,
        height: height
    }


    return (
        <div className='section-ctn' style={styles}>{props.children}</div>
    )
}

export default Section