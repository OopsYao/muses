import React from 'react'
import sty from './Markdown.module.css'

export default ({ html }) => {
    return <article dangerouslySetInnerHTML={{ __html: html }} className={sty.root} />
}
