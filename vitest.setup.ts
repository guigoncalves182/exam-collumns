import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// jsdom não implementa a Font Loading API usada pelo useExamPagination.
if (!('fonts' in document)) {
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: { ready: Promise.resolve() },
  })
}

// jsdom não carrega imagens, então `complete` permaneceria false e o
// useExamPagination ficaria aguardando o onload indefinidamente. Consideramos
// as imagens sempre carregadas no ambiente de teste.
Object.defineProperty(HTMLImageElement.prototype, 'complete', {
  configurable: true,
  get: () => true,
})

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
})
