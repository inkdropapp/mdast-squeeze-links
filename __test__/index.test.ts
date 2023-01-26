// import fs from 'fs'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { u } from 'unist-builder'
import { squeezeLinks } from '../src/'

test('mdast', () => {
  const tree = u('root', [
    u('link', { url: '#about' }, [u('text', 'About')]),
    u('link', { url: '#about' }, [u('text', ' ')])
  ])
  squeezeLinks(tree)

  expect(tree.children.length).toBe(1)
  expect(tree.children[0].type).toBe('link')
  expect(tree.children[0].url).toBe('#about')
  expect(tree.children[0].children.length).toBe(1)
  expect(tree.children[0].children[0].type).toBe('text')
  expect(tree.children[0].children[0].value).toBe('About')
  console.log(tree.children[0], { depth: null })
})

test('markdown', () => {
  const md = `[](#about)`
  const mdast = fromMarkdown(md)
  expect(typeof mdast).toBe('object')
  console.log('original tree:', JSON.stringify(mdast.children[0], null, 4))
  const resolved = squeezeLinks(mdast)
  console.log('fixed tree:', resolved?.children[0])
  const result = toMarkdown(mdast)
  console.log('result:', JSON.stringify(result))
  expect(typeof result).toBe('string')
  expect(result).toBe('')
})
