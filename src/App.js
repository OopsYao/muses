import React, { useState } from 'react'
import Markdown from './components/Markdown'

const pageSelect = (page) => new Promise((resolve, reject) => {
    import(`../notes/${page}`)
        .then((mod) => resolve(mod.default))
        .catch(reject)
})

export default () => {
    const star = window.location.pathname.split('/')[1]
    if (star) {
        const [html, setHtml] = useState('')
        // sub page
        pageSelect(star)
            .then(({html: rawHtml}) => setHtml(rawHtml))
            .catch(() => setHtml(`<h1>404</h1>`))
        return <Markdown html={html} />
    } else {
        // landing page
        return <h1>Hello World</h1>
    }
}
