'use strict'

var remove = require('unist-util-remove')

module.exports = squeeze

function squeeze(tree) {
  return remove(tree, {cascade: false}, isEmptyLink)
}

// Whether paragraph is empty or composed only of whitespace.
function isEmptyLink(node) {
  return node.type === 'link' && node.children.every(isEmptyText)
}

function isEmptyText(node) {
  return node.type === 'text' && /^\s*$/.test(node.value)
}
