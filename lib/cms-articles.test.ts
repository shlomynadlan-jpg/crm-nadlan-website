import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mdToHtml } from './cms-articles.ts'

test('raw HTML in CMS markdown is escaped, markdown still renders', () => {
  const html = mdToHtml('פסקה <script>alert(1)</script> <img src=x onerror=alert(1)>\n\n## כותרת\n\n**מודגש**')
  assert.ok(!/<script|<img/i.test(html))
  assert.ok(html.includes('&lt;script&gt;'))
  assert.ok(/<h2[^>]*>/.test(html) && html.includes('<strong>מודגש</strong>'))
})

test('link URL cannot break out of the href attribute', () => {
  const html = mdToHtml('[x](https://a.com/"onmouseover="alert(1))')
  assert.ok(!html.includes('<a ')) // not turned into a link at all
})
