# mdast-squeeze-links

[**mdast**][mdast] utility to remove empty links from a tree.

Links are considered empty if they do not contain non-whitespace
characters.

## Install

[npm][]:

```sh
npm install mdast-squeeze-links
```

## Use

```js
var u = require('unist-builder')
var squeezeLinks = require('mdast-squeeze-links')

var tree = u('root', [
  u('link', { url: '#about' }, [u('text', 'About')),
  u('link', { url: '#about' }, [u('text', ' '))
])

squeezeLinks(tree)

console.dir(tree, {depth: null})
```

Yields:

```js
{
  type: 'root',
  children: [ { type: 'link', url: '#about', children: [{ type: 'text', value: 'About' }] } ]
}
```

## API

### `squeezeLinks(tree)`

Modifies [tree][] in-place.
Returns `tree`.

## Related

- [`remark-squeeze-links`][remark-squeeze-links]
  — [**remark**][remark] plugin wrapper

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Takuya Matsuyama][author]

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install
[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md
[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md
[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md
[tree]: https://github.com/syntax-tree/unist#tree
[mdast]: https://github.com/syntax-tree/mdast
[remark]: https://github.com/remarkjs/remark
[remark-squeeze-links]: https://github.com/remarkjs/remark-squeeze-links
[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
[hast]: https://github.com/syntax-tree/hast
[license]: LICENSE
[author]: https://www.craftz.dog/
