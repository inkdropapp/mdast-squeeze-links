import { Root } from 'mdast'
import { remove } from 'unist-util-remove'
import { Node } from 'unist'

export function squeezeLinks(tree: Root): Root | null {
  return remove(tree, { cascade: false }, isEmptyLink)
}

// Whether paragraph is empty or composed only of whitespace.
function isEmptyLink(node: Node) {
  return (
    node.type === 'link' &&
    node.children instanceof Array &&
    node.children.every(isEmptyText)
  )
}

function isEmptyText(node: Node) {
  return node.type === 'text' && /^\s*$/.test(node.value as string)
}
