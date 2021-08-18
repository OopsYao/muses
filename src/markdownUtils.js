const extractFootnoteLinks = str => {
    const inline = /\^\[(\/\w+)\]/
    const normal = /\[\^\w+\]: (\/\w+)/
    const inlineLinks = (str.match(new RegExp(inline, 'g')) || []).map(s => s.match(inline)[1])
    const normalLinks = (str.match(new RegExp(normal, 'g')) || []).map(s => s.match(normal)[1])
    return [...inlineLinks, ...normalLinks]
}

module.exports = {
    extractFootnoteLinks
}
