import React, { useState, useEffect } from 'react'
import Markdown from './components/Markdown'

const pageSelect = async (page) => {
    const { default: r } = await import(`../notes/${page}`)
    return r
}

export default () => {
    const star = window.location.pathname.split('/')[1]
    const [el, setElement] = useState(star ? <Markdown /> : <h1>Hello World</h1>)
    useEffect(() => {
        (async () => {
            if (star) {
                try {
                    const { html } = await pageSelect(star)
                    setElement(<Markdown html={html} />)
                } catch {
                    setElement(<Markdown html={`<h1>404</h1>`} />)
                }
            } else {
                const { default: Graph } = await import('./components/Graph')
                const nodes = [{ id: 'gogo' }, { id: 'df' }]
                const links = [{ from: 'gogo', to: 'df' }]
                setElement(<Graph nodes={nodes} links={links} />)
            }
        })()
    }, [])
    return el
}
