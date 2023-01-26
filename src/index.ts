import { Root, Link, Literal } from 'mdast'
import { remove } from 'unist-util-remove'
import { Node } from 'unist'

export function squeezeLinks(tree: Root): Root {
  const res = remove(tree, { cascade: false }, isEmptyLink)
  if (res) return res
  else return tree
}

// Whether paragraph is empty or composed only of whitespace.
function isEmptyLink(node: Node) {
  return node.type === 'link' && (node as Link).children.every(isEmptyText)
}

function isEmptyText(node: Node) {
  return node.type === 'text' && /^\s*$/.test((node as Literal).value as string)
}
