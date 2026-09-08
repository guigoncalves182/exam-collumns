import type { MathJax2Config } from 'better-react-mathjax'

export const MATHJAX_CONFIG = {
  'fast-preview': {
    disabled: true,
  },
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
  messageStyle: 'none',
} as MathJax2Config
