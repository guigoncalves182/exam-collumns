import { describe, expect, it } from 'vitest'
import { createChunks, hasMathContent, paginateChunks, MATH_MARKER } from './exam'
import type { IExamPrintQuestion, MeasuredChunk } from '../types/exam'

const buildQuestion = (
  overrides: Partial<IExamPrintQuestion> = {},
): IExamPrintQuestion => ({
  id: 'q1',
  description: 'Enunciado da questão',
  alternatives: [
    { id: 'a', description: 'Alternativa A' },
    { id: 'b', description: 'Alternativa B' },
  ],
  ...overrides,
})

const measured = (overrides: Partial<MeasuredChunk>): MeasuredChunk => ({
  id: 'chunk',
  questionId: 'q1',
  type: 'statement',
  content: 'conteúdo',
  height: 100,
  ...overrides,
})

describe('hasMathContent', () => {
  it('deve retornar true quando o HTML contém o marcador de matemática', () => {
    expect(hasMathContent(`texto ${MATH_MARKER}\\(x\\)</span>`)).toBe(true)
  })

  it('deve retornar false quando o HTML não contém conteúdo matemático', () => {
    expect(hasMathContent('<p>texto simples</p>')).toBe(false)
  })
})

describe('createChunks', () => {
  it('deve gerar um chunk de header, um de statement e um por alternativa', () => {
    const chunks = createChunks(buildQuestion(), 0)

    expect(chunks).toHaveLength(4)
    expect(chunks.map((chunk) => chunk.type)).toEqual([
      'header',
      'statement',
      'alternative',
      'alternative',
    ])
  })

  it('deve numerar o header a partir do índice informado (base 1)', () => {
    const chunks = createChunks(buildQuestion(), 4)

    expect(chunks[0].content).toBe('Questão 5')
    expect(chunks[0].id).toBe('q1-header')
    expect(chunks[0].type).toBe('header')
  })

  it('deve usar a descrição da questão como conteúdo do statement', () => {
    const chunks = createChunks(
      buildQuestion({ description: 'Minha descrição' }),
      0,
    )

    const statement = chunks.find((chunk) => chunk.type === 'statement')
    expect(statement?.content).toBe('Minha descrição')
    expect(statement?.id).toBe('q1-statement')
  })

  it('deve prefixar as alternativas com letras sequenciais (A, B, C...)', () => {
    const question = buildQuestion({
      alternatives: [
        { id: 'x', description: 'Primeira' },
        { id: 'y', description: 'Segunda' },
        { id: 'z', description: 'Terceira' },
      ],
    })

    const alternatives = createChunks(question, 0).filter(
      (chunk) => chunk.type === 'alternative',
    )

    expect(alternatives.map((alt) => alt.content)).toEqual([
      'A) Primeira',
      'B) Segunda',
      'C) Terceira',
    ])
    expect(alternatives.map((alt) => alt.id)).toEqual([
      'q1-alt-x',
      'q1-alt-y',
      'q1-alt-z',
    ])
  })

  it('deve associar todos os chunks ao id da questão', () => {
    const chunks = createChunks(buildQuestion({ id: 'abc' }), 0)
    expect(chunks.every((chunk) => chunk.questionId === 'abc')).toBe(true)
  })
})

describe('paginateChunks', () => {
  it('deve retornar ao menos uma página mesmo sem chunks', () => {
    const pages = paginateChunks([], 2, 1000)

    expect(pages).toHaveLength(1)
    expect(pages[0].columns).toHaveLength(2)
  })

  it('deve respeitar a quantidade de colunas solicitada', () => {
    const pages = paginateChunks([measured({ id: 'c1', type: 'header', height: 20 })], 3, 1000)

    expect(pages[0].columns).toHaveLength(3)
  })

  it('deve tratar contagem de colunas inválida como no mínimo uma coluna', () => {
    const pages = paginateChunks([measured({ id: 'c1', height: 20 })], 0, 1000)

    expect(pages[0].columns).toHaveLength(1)
  })

  it('deve alocar chunks que cabem na primeira coluna da primeira página', () => {
    const chunks: MeasuredChunk[] = [
      measured({ id: 'h', type: 'header', height: 20 }),
      measured({ id: 's', type: 'statement', height: 40 }),
    ]

    const pages = paginateChunks(chunks, 2, 1000)

    const ids = pages[0].columns[0].items.map((item) => item.id)
    expect(ids).toEqual(['h', 's'])
  })

  it('não deve deixar um header órfão no fim da coluna sem espaço para o statement', () => {
    // Coluna quase cheia: o header não deve iniciar aqui pois não há espaço para o statement.
    const chunks: MeasuredChunk[] = [
      measured({ id: 'filler', type: 'statement', height: 950 }),
      measured({ id: 'h', type: 'header', height: 20 }),
      measured({ id: 's', type: 'statement', height: 300 }),
    ]

    const pages = paginateChunks(chunks, 1, 1000)

    const firstColumnIds = pages[0].columns[0].items.map((item) => item.id)
    // O header não deve ser o último item de uma coluna cheia.
    expect(firstColumnIds).toEqual(['filler'])
  })

  it('deve dividir um statement grande e divisível entre duas colunas', () => {
    const longText = 'palavra '.repeat(400).trim()
    const chunks: MeasuredChunk[] = [
      measured({ id: 'big', type: 'statement', content: longText, height: 1500 }),
    ]

    const pages = paginateChunks(chunks, 2, 1000)

    const allItems = pages.flatMap((page) =>
      page.columns.flatMap((column) => column.items),
    )
    const parts = allItems.filter((item) => item.id.startsWith('big-part-'))

    expect(parts.length).toBeGreaterThanOrEqual(2)
  })

  it('deve mover para uma nova página quando o conteúdo excede as colunas disponíveis', () => {
    const chunks: MeasuredChunk[] = [
      measured({ id: 'a', type: 'statement', height: 900 }),
      measured({ id: 'b', type: 'statement', height: 900 }),
      measured({ id: 'c', type: 'statement', height: 900 }),
    ]

    const pages = paginateChunks(chunks, 1, 1000)

    expect(pages.length).toBeGreaterThan(1)
  })

  it('deve usar a altura padrão quando a altura disponível informada for inválida', () => {
    const pages = paginateChunks([measured({ id: 'c1', height: 20 })], 1, 0)

    expect(pages).toHaveLength(1)
    expect(pages[0].columns[0].items).toHaveLength(1)
  })
})

describe('paginateChunks - divisão de conteúdo HTML', () => {
  const allItems = (pages: ReturnType<typeof paginateChunks>) =>
    pages.flatMap((page) => page.columns.flatMap((column) => column.items))

  it('deve fechar e reabrir as tags HTML abertas ao dividir um statement', () => {
    const inner = 'palavra '.repeat(50).trim()
    const chunk = measured({
      id: 'tagged',
      type: 'statement',
      content: `<strong>${inner}</strong>`,
      height: 1200,
    })

    const items = allItems(paginateChunks([chunk], 1, 1000))
    const parts = items.filter((item) => item.id.startsWith('tagged-part-'))

    expect(parts.length).toBeGreaterThanOrEqual(2)

    const firstPart = parts.find((item) => item.id === 'tagged-part-0')
    const secondPart = parts.find((item) => item.id === 'tagged-part-1')

    // A primeira parte deve fechar a tag e a segunda deve reabri-la.
    expect(firstPart?.content.endsWith('</strong>')).toBe(true)
    expect(secondPart?.content.startsWith('<strong>')).toBe(true)
  })

  it('deve ignorar elementos void e tags já fechadas ao reabrir apenas as tags realmente abertas', () => {
    // <div> permanece aberto; <br> é void; <em>...</em> já está fechado antes do corte.
    const content =
      `<div>${'palavra '.repeat(5)}<br><em>${'texto '.repeat(5)}</em>` +
      `${'fim '.repeat(80)}</div>`

    const chunk = measured({
      id: 'nested',
      type: 'statement',
      content,
      height: 1200,
    })

    const items = allItems(paginateChunks([chunk], 1, 1000))
    const parts = items.filter((item) => item.id.startsWith('nested-part-'))

    expect(parts.length).toBeGreaterThanOrEqual(2)

    const firstPart = parts.find((item) => item.id === 'nested-part-0')
    const secondPart = parts.find((item) => item.id === 'nested-part-1')

    // Apenas a <div> deve ser fechada/reaberta (o <em> já fechou e o <br> é void).
    expect(firstPart?.content.endsWith('</div>')).toBe(true)
    expect(secondPart?.content.startsWith('<div>')).toBe(true)
    expect(secondPart?.content.startsWith('<div><em>')).toBe(false)
  })

  it('deve buscar o ponto de quebra à frente quando não há espaço antes do índice', () => {
    const chunk = measured({
      id: 'forward',
      type: 'statement',
      content: `${'x'.repeat(300)} fim`,
      height: 1200,
    })

    const items = allItems(paginateChunks([chunk], 1, 1000))
    const parts = items.filter((item) => item.id.startsWith('forward-part-'))

    expect(parts.length).toBeGreaterThanOrEqual(2)
    // O corte para frente ocorre no único espaço disponível (após os 300 'x').
    expect(parts[0]?.content.length).toBeGreaterThanOrEqual(300)
  })

  it('deve recuar até a abertura da tag quando o ponto de quebra cai dentro de uma tag', () => {
    const chunk = measured({
      id: 'intag',
      type: 'statement',
      content: `<${'a'.repeat(400)}>`,
      height: 1200,
    })

    const pages = paginateChunks([chunk], 1, 1000)
    const parts = allItems(pages).filter((item) => item.id.startsWith('intag-part-'))

    expect(parts.length).toBeGreaterThanOrEqual(2)
    // O ponto seguro recua para a abertura da tag ('<'), gerando a primeira parte mínima.
    expect(parts[0]?.content.startsWith('<')).toBe(true)
  })
})

describe('paginateChunks - regras de header e conteúdo indivisível', () => {
  it('deve mover o header para a próxima coluna quando não há espaço para o statement', () => {
    const chunks: MeasuredChunk[] = [
      measured({ id: 'filler', type: 'statement', height: 900 }),
      measured({ id: 'h', type: 'header', height: 20 }),
      // Statement indivisível (contém imagem) e maior que a coluna.
      measured({
        id: 's',
        type: 'statement',
        content: '<img src="foto.png" /> conteúdo com imagem',
        height: 1200,
      }),
    ]

    const pages = paginateChunks(chunks, 1, 1000)

    // O filler fica sozinho na primeira coluna/página; o header não deve acompanhá-lo.
    expect(pages[0].columns[0].items.map((item) => item.id)).toEqual(['filler'])

    const allIds = pages
      .flatMap((page) => page.columns)
      .flatMap((column) => column.items)
      .map((item) => item.id)

    // Header e statement indivisível são realocados e ambos permanecem presentes.
    expect(allIds).toContain('h')
    expect(allIds).toContain('s')
  })

  it('deve posicionar à força um chunk indivisível maior que a altura da coluna', () => {
    const chunk = measured({
      id: 'huge-img',
      type: 'statement',
      content: '<img src="grande.png" />',
      height: 1500,
    })

    const pages = paginateChunks([chunk], 1, 1000)
    const items = pages
      .flatMap((page) => page.columns)
      .flatMap((column) => column.items)

    // Mesmo excedendo a coluna, o chunk indivisível é posicionado (não some).
    expect(items.map((item) => item.id)).toContain('huge-img')
  })

  it('não deve dividir statements que contenham conteúdo matemático', () => {
    const chunk = measured({
      id: 'math',
      type: 'statement',
      content: `Fórmula ${MATH_MARKER}\\(x^2\\)</span>`,
      height: 1400,
    })

    const pages = paginateChunks([chunk], 1, 1000)
    const items = pages
      .flatMap((page) => page.columns)
      .flatMap((column) => column.items)

    // Sem divisão: nenhum id "-part-" é gerado.
    expect(items.some((item) => item.id.startsWith('math-part-'))).toBe(false)
    expect(items.map((item) => item.id)).toContain('math')
  })
})
