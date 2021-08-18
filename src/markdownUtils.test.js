const { extractFootnoteLinks } = require('./markdownUtils')

const footnote = `
This is a footnote demo.^[/inline] Also add some footnote[^normal].

## Footnote

[^normal]: /somenote
`

test('extract footnote', () => {
    const links = extractFootnoteLinks(footnote)
    const shouldBe = ['/inline', '/somenote']
    expect(links.sort()).toEqual(shouldBe.sort())
})
