const { getMeta } = require('./metaInfo')
const MarkdownIt = require('markdown-it')
const fm = require('front-matter')

const md = MarkdownIt()
const process = async (path, content) => {
    const segs = path.split('/')
    const name = segs[segs.length - 1]
    const [id] = name.split('.')

    const { body } = fm(content)
    const html = md.render(body)
    const meta = await getMeta(id)
    return { meta, html }
}

module.exports = function(content, map, meta) {
    (async () => {
        const { resourcePath } = this
        const callback = this.async()
        const r = await process(resourcePath, content)
        callback(null, `export default ${JSON.stringify(r)}`, map, meta)
    })()
}
