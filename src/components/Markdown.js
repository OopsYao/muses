import React from 'react'

export default ({ html }) => {
    return <article dangerouslySetInnerHTML={{ __html: html }} />
}
