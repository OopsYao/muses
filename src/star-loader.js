const MarkdownIt = require('markdown-it')
const fm = require('front-matter')

const md = MarkdownIt()
const process = async (_, content) => {
  let dirMeta = {}
  // TODO dirMeta info
  const { body, attributes: fileMeta } = fm(content)
  const html = md.render(body)
  const meta = { ...dirMeta, ...fileMeta }
  return { meta, html }
}

module.exports = function(content, map, meta) {
  ;(async () => {
    const { resourcePath } = this
    const callback = this.async()
    const r = await process(resourcePath, content)
    callback(null, `export default ${JSON.stringify(r)}`, map, meta)
  })()
}
