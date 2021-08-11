import React, { useState } from 'react'
import Markdown from './components/Markdown'

const pageSelect = async (page) => {
    const { default: r } = await import(`../notes/${page}`)
    return r
}

export default () => {
    const star = window.location.pathname.split('/')[1]
    if (star) {
        const [html, setHtml] = useState('')
        // sub page
        ;(async () => {
            try {
                const { html: rawHtml } = await pageSelect(star)
                setHtml(rawHtml)
            } catch {
                setHtml(`<h1>404</h1>`)
            }
        })()
        return <Markdown html={html} />
    } else {
        // landing page
        return <h1>Hello World</h1>
    }
}
