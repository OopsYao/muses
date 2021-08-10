const fs = require('fs/promises')
const path = require('path')
const fm = require('front-matter')
const markdownLinkExtractor = require('markdown-link-extractor')

let globalMeta
let links

const scan = async () => {
    if (globalMeta) {
        return { globalMeta, links }
    }

    const files = (await fs.readdir('notes')).map(f => path.resolve('notes', f))
    const rawMetas = await Promise.all(files.map(getRawMeta))
    links = rawMetas.flatMap(({ id, mentioned }) =>
        mentioned.map(mid => ({ from: id, to: mid }))
    )
    const metas = rawMetas.map(({ id, mentioned }) => ({
        id,
        mentioned,
        by: links.filter(({ to }) => to === id)
            .map(({ from }) => from)
    }))
    globalMeta = metas.reduce((map, meta) => {
        map[meta.id] = meta
        return map
    }, {})
    return { globalMeta, links }
}

// Meta info not relavent to global info
const getRawMeta = async (path) => {
    const segs = path.split('/')
    const name = segs[segs.length - 1]
    const [id] = name.split('.')

    const stats = await fs.lstat(path)
    let targetFile = path
    let dirAttr = {}
    if (stats.isDirectory()) {
        // TODO Change targetFile and get dirAttr
        targetFile = [path, 'index.md'].join('/')
    }
    const content = (await fs.readFile(targetFile)).toString()
    const { attributes: fileAttr } = fm(content)
    const links = markdownLinkExtractor(content)
    const mentioned = links.filter(l => !l.includes('/'))
    const { ...misc } = { ...dirAttr, ...fileAttr }
    const meta = {
        misc,
        mentioned,
        id,
    }
    return meta
}

const getMeta = async (id) => {
    const { globalMeta } = await scan()
    return globalMeta[id]
}

const getNet = async () => {
    const { links } = await scan()
    return links
}

module.exports = {
    getMeta,
    getNet,
}
