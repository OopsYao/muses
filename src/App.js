import React, { useState, useEffect } from 'react'

const pageSelect = async (page) => {
    const { default: r } = await import(`../notes/${page}`)
    return r
}

export default () => {
    const loadingElement = <h1>Loading</h1>
    const [element, setElement] = useState(loadingElement)
    useEffect(() => {
        (async () => {
            const star = window.location.pathname.split('/')[1]
            if (star) {
                const { default: Markdown } = await import('./components/Markdown')
                try {
                    const { html } = await pageSelect(star)
                    setElement(<Markdown html={html} />)
                } catch {
                    setElement(<h1>404</h1>)
                }
            } else {
                setElement(<h1>Hello World</h1>)
            }
        })()
    })
    return element
}
