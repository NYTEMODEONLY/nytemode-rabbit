import _RemarkEmoji from 'remark-emoji'
import _Highlight from '/Users/lobo/Desktop/Progress/Built in 2025/r1/sdk/creations-sdk/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.js'

export const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":"github-dark"}