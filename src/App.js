import React, { useState, useEffect } from 'react'
import Markdown from './components/Markdown'

const pageSelect = async (page) => {
    const { default: r } = await import(`../notes/${page}`)
    return r
}

export default () => {
    const star = window.location.pathname.split('/')[1]
    const [html, setHtml] = useState('')
    useEffect(() => {
        (async () => {
            if (star) {
                try {
                    const { html } = await pageSelect(star)
                    setHtml(html)
                } catch {
                    setHtml(<h1>404</h1>)
                }
            }
        })()
    }, [])

    if (star) {
        return <Markdown html={html} />
    } else {
        return <h1>Hello World</h1>
    }
}
