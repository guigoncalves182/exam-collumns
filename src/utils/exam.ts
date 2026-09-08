import type { IExamPrintQuestion, ChunkData, MeasuredChunk, PageData, ColumnCount } from '../types/exam'
import { AVAILABLE_HEIGHT, GAP } from '../constants/exam.constants'

export const MATH_MARKER = '<span class="math-tex">'

export function hasMathContent(html: string): boolean {
  return html.includes(MATH_MARKER)
}

export function createChunks(question: IExamPrintQuestion, index: number): ChunkData[] {
  const header: ChunkData = {
    id: `${question.id}-header`,
    questionId: question.id,
    type: 'header',
    content: `Questão ${index + 1}`,
  }

  const statement: ChunkData = {
    id: `${question.id}-statement`,
    questionId: question.id,
    type: 'statement',
    content: question.description,
  }

  const alternatives: ChunkData[] = question.alternatives.map((alt, altIndex) => ({
    id: `${question.id}-alt-${alt.id}`,
    questionId: question.id,
    type: 'alternative',
    content: `${String.fromCodePoint(65 + altIndex)}) ${alt.description}`,
  }))

  return [header, statement, ...alternatives]
}

function createEmptyPage(columnCount: ColumnCount): PageData {
  const count = Math.max(1, Math.floor(columnCount))
  return {
    columns: Array.from({ length: count }, () => ({ height: 0, items: [] })),
  }
}

function isInsideTag(text: string, index: number): boolean {
  for (let i = index - 1; i >= 0; i--) {
    if (text[i] === '>') return false
    if (text[i] === '<') return true
  }
  return false
}

function findSafeSplitPoint(text: string, startIndex: number): number {
  for (let i = startIndex; i >= Math.max(0, startIndex - 200); i--) {
    if ((text[i] === ' ' || text[i] === '.' || text[i] === ',') && !isInsideTag(text, i)) {
      return i + 1
    }
  }

  for (let i = startIndex + 1; i < Math.min(text.length, startIndex + 200); i++) {
    if ((text[i] === ' ' || text[i] === '.' || text[i] === ',') && !isInsideTag(text, i)) {
      return i + 1
    }
  }

  if (isInsideTag(text, startIndex)) {
    for (let i = startIndex; i >= 0; i--) {
      if (text[i] === '<') return i
    }
  }

  return startIndex
}

function getOpenTags(html: string): string[] {
  const openTags: string[] = []
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g
  let match: RegExpExecArray | null

  while ((match = tagRegex.exec(html)) !== null) {
    const fullMatch = match[0]
    const tagName = match[1].toLowerCase()

    if (fullMatch.endsWith('/>')) continue

    const voidElements = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']
    if (voidElements.includes(tagName)) continue

    if (fullMatch.startsWith('</')) {
      const idx = openTags.lastIndexOf(tagName)
      if (idx !== -1) openTags.splice(idx, 1)
    } else {
      openTags.push(tagName)
    }
  }

  return openTags
}

function splitChunk(
  chunk: MeasuredChunk,
  availableHeight: number
): [MeasuredChunk, MeasuredChunk] {
  const ratio = availableHeight / chunk.height
  const text = chunk.content
  const splitIndex = Math.floor(text.length * ratio)

  let bestSplit = findSafeSplitPoint(text, splitIndex)

  if (bestSplit <= 0) bestSplit = 1
  if (bestSplit >= text.length) bestSplit = text.length - 1

  let firstContent = text.slice(0, bestSplit)
  let secondContent = text.slice(bestSplit)

  const openTags = getOpenTags(firstContent)
  if (openTags.length > 0) {
    const closingTags = [...openTags].reverse().map((tag) => `</${tag}>`).join('')
    firstContent += closingTags

    const reopeningTags = openTags.map((tag) => `<${tag}>`).join('')
    secondContent = reopeningTags + secondContent
  }

  const firstPart: MeasuredChunk = {
    ...chunk,
    id: `${chunk.id}-part-0`,
    content: firstContent,
    height: availableHeight,
  }

  const secondPart: MeasuredChunk = {
    ...chunk,
    id: `${chunk.id}-part-1`,
    content: secondContent,
    height: chunk.height - availableHeight,
  }

  return [firstPart, secondPart]
}

const MIN_STATEMENT_START = 60

function isSplittable(chunk: MeasuredChunk): boolean {
  if (chunk.type !== 'statement' && chunk.type !== 'alternative') return false
  if (chunk.content.includes(MATH_MARKER)) return false
  return !/<img\b|<svg\b|<picture\b|<video\b/i.test(chunk.content)
}

export function paginateChunks(
  measuredChunks: MeasuredChunk[],
  columnCount: ColumnCount = 2,
  availableHeight: number = AVAILABLE_HEIGHT
): PageData[] {
  const count = Math.max(1, Math.floor(columnCount))
  const usableHeight = availableHeight > 0 ? availableHeight : AVAILABLE_HEIGHT
  const pages: PageData[] = []
  let page = createEmptyPage(count)
  let columnIndex = 0
  const maxColumnIndex = count - 1

  const queue = [...measuredChunks]

  function currentColumn() {
    return page.columns[columnIndex]
  }

  function nextColumn() {
    if (columnIndex < maxColumnIndex) {
      columnIndex++
      return
    }
    pages.push(page)
    page = createEmptyPage(count)
    columnIndex = 0
  }

  let i = 0
  while (i < queue.length) {
    const chunk = queue[i]
    const column = currentColumn()

    if (chunk.type === 'header') {
      const spaceAfterHeader =
        usableHeight - column.height - (chunk.height + GAP) - GAP

      const statement = queue[i + 1]
      let canStartStatement: boolean

      if (!statement || statement.type !== 'statement') {
        canStartStatement = spaceAfterHeader >= MIN_STATEMENT_START
      } else if (isSplittable(statement)) {
        canStartStatement =
          spaceAfterHeader >= Math.min(MIN_STATEMENT_START, statement.height)
      } else {
        canStartStatement = spaceAfterHeader >= statement.height
      }

      if (!canStartStatement && column.items.length > 0) {
        nextColumn()
        continue
      }

      column.items.push(chunk)
      column.height += chunk.height + GAP
      i++
      continue
    }

    if (column.height + chunk.height + GAP <= usableHeight) {
      column.items.push(chunk)
      column.height += chunk.height + GAP
      i++
      continue
    }

    const remainingHeight = usableHeight - column.height - GAP

    if (isSplittable(chunk) && remainingHeight >= 60) {
      const [firstPart, secondPart] = splitChunk(chunk, remainingHeight)
      column.items.push(firstPart)
      column.height += firstPart.height + GAP

      queue[i] = secondPart
      nextColumn()
      continue
    }

    nextColumn()

    if (chunk.height > usableHeight) {
      currentColumn().items.push(chunk)
      currentColumn().height += chunk.height + GAP
      i++
    }
  }

  pages.push(page)
  return pages
}
