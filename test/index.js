var test = require('ava')
var fs = require('fs')
var fromMarkdown = require('mdast-util-from-markdown')
var toMarkdown = require('mdast-util-to-markdown')
var u = require('unist-builder')
var squeezeLinks = require('../')

test('mdast', (t) => {
  var tree = u('root', [
    u('link', { url: '#about' }, [u('text', 'About')]),
    u('link', { url: '#about' }, [u('text', ' ')])
  ])
  squeezeLinks(tree)
  console.dir(tree.children[0])

  t.is(tree.children.length, 1)
  t.is(tree.children[0].type, 'link')
  t.is(tree.children[0].url, '#about')
  t.is(tree.children[0].children.length, 1)
  t.is(tree.children[0].children[0].type, 'text')
  t.is(tree.children[0].children[0].value, 'About')
  t.log(tree.children[0], {depth: null})
})

test('markdown', (t) => {
  const md = `[](#about)`
  const mdast = fromMarkdown(md)
  t.is(typeof mdast, 'object')
  t.log('original tree:', mdast.children[0].children)
  const resolved = squeezeLinks(mdast)
  t.log('fixed tree:', resolved.children[0].children)
  const result = toMarkdown(mdast)
  t.log('result:', result)
  t.is(typeof result, 'string')
  t.is(result, '')
})
