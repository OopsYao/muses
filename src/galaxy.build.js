const { getNet } = require('./metaInfo')

module.exports = async () => {
    const links = await getNet()
    return {
        code: `module.exports = ${JSON.stringify(links)}`
    }
}
