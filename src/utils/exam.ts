import type { IExamPrintQuestion, ChunkData, MeasuredChunk, PageData, ColumnCount } from '../types/exam'
import { AVAILABLE_HEIGHT, GAP } from '../constants/exam'

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

/**
 * Checks if a given index is inside an HTML tag (between < and >).
 */
function isInsideTag(text: string, index: number): boolean {
  // Look backward for the nearest < or >
  for (let i = index - 1; i >= 0; i--) {
    if (text[i] === '>') return false
    if (text[i] === '<') return true
  }
  return false
}

/**
 * Finds a safe split point that is not inside an HTML tag.
 * Searches backward from the initial index for a space/punctuation outside of tags.
 */
function findSafeSplitPoint(text: string, startIndex: number): number {
  // Search backward for a valid break point outside of HTML tags
  for (let i = startIndex; i >= Math.max(0, startIndex - 200); i--) {
    if ((text[i] === ' ' || text[i] === '.' || text[i] === ',') && !isInsideTag(text, i)) {
      return i + 1
    }
  }

  // If no good point found searching backward, search forward
  for (let i = startIndex + 1; i < Math.min(text.length, startIndex + 200); i++) {
    if ((text[i] === ' ' || text[i] === '.' || text[i] === ',') && !isInsideTag(text, i)) {
      return i + 1
    }
  }

  // Last resort: find the nearest position that is outside a tag
  if (isInsideTag(text, startIndex)) {
    // Move backward to before the tag opens
    for (let i = startIndex; i >= 0; i--) {
      if (text[i] === '<') return i
    }
  }

  return startIndex
}

/**
 * Extracts all open HTML tags (not self-closing) from a string, tracking which are still open.
 * Returns the list of tags that were opened but not closed.
 */
function getOpenTags(html: string): string[] {
  const openTags: string[] = []
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g
  let match: RegExpExecArray | null

  while ((match = tagRegex.exec(html)) !== null) {
    const fullMatch = match[0]
    const tagName = match[1].toLowerCase()

    // Skip self-closing tags
    if (fullMatch.endsWith('/>')) continue

    // Skip void elements that don't need closing
    const voidElements = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']
    if (voidElements.includes(tagName)) continue

    if (fullMatch.startsWith('</')) {
      // Closing tag — remove the last matching open tag
      const idx = openTags.lastIndexOf(tagName)
      if (idx !== -1) openTags.splice(idx, 1)
    } else {
      // Opening tag
      openTags.push(tagName)
    }
  }

  return openTags
}

/**
 * Splits a measured chunk into two parts based on available height.
 * Ensures HTML tags are never split in the middle and that open tags
 * are properly closed in the first part and reopened in the second part.
 */
function splitChunk(
  chunk: MeasuredChunk,
  availableHeight: number
): [MeasuredChunk, MeasuredChunk] {
  const ratio = availableHeight / chunk.height
  const text = chunk.content
  const splitIndex = Math.floor(text.length * ratio)

  // Find a safe split point that doesn't break HTML tags
  let bestSplit = findSafeSplitPoint(text, splitIndex)

  // Ensure we don't create empty parts
  if (bestSplit <= 0) bestSplit = 1
  if (bestSplit >= text.length) bestSplit = text.length - 1

  let firstContent = text.slice(0, bestSplit)
  let secondContent = text.slice(bestSplit)

  // Close any open tags in the first part and reopen them in the second part
  const openTags = getOpenTags(firstContent)
  if (openTags.length > 0) {
    // Close tags in reverse order for the first part
    const closingTags = [...openTags].reverse().map((tag) => `</${tag}>`).join('')
    firstContent += closingTags

    // Reopen tags in original order for the second part
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

/**
 * Minimum height (px) that the beginning of a statement must occupy in the same
 * column as its header, so the header is never left orphaned.
 */
const MIN_STATEMENT_START = 60

/**
 * A chunk can be safely split across columns only when it is plain flowing
 * content (text). Chunks containing images (or other embedded media) must never
 * be split, otherwise the HTML tag would be cut and the media broken/hidden.
 */
function isSplittable(chunk: MeasuredChunk): boolean {
  if (chunk.type !== 'statement' && chunk.type !== 'alternative') return false
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

  // Work with a copy to avoid mutating the input
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

    // If this is a header ("Questão X" + divider), it must never be orphaned:
    // it can only stay in the current column if at least the start of its
    // statement can follow it here. Otherwise, move the header to the next
    // column/page so it travels together with the statement.
    if (chunk.type === 'header') {
      // Space left for the statement AFTER placing this header in the column.
      const spaceAfterHeader =
        usableHeight - column.height - (chunk.height + GAP) - GAP

      const statement = queue[i + 1]
      let canStartStatement: boolean

      if (!statement || statement.type !== 'statement') {
        // Defensive: no statement follows — just require some room.
        canStartStatement = spaceAfterHeader >= MIN_STATEMENT_START
      } else if (isSplittable(statement)) {
        // Divisible text: only the beginning needs to fit here.
        canStartStatement =
          spaceAfterHeader >= Math.min(MIN_STATEMENT_START, statement.height)
      } else {
        // Non-divisible statement (e.g. contains an image): the WHOLE statement
        // must fit alongside the header, otherwise they must move together.
        canStartStatement = spaceAfterHeader >= statement.height
      }

      // Only relocate when the column already has content. If the column is
      // empty and it still doesn't fit, place it here anyway (the statement is
      // then force-placed later) to avoid an infinite loop.
      if (!canStartStatement && column.items.length > 0) {
        nextColumn()
        continue
      }

      // Place the header
      column.items.push(chunk)
      column.height += chunk.height + GAP
      i++
      continue
    }

    // Chunk fits in current column
    if (column.height + chunk.height + GAP <= usableHeight) {
      column.items.push(chunk)
      column.height += chunk.height + GAP
      i++
      continue
    }

    const remainingHeight = usableHeight - column.height - GAP

    // Chunk doesn't fit — check if it's splittable flowing text (never split media)
    // and there's meaningful space remaining in the current column (at least 60px)
    if (isSplittable(chunk) && remainingHeight >= 60) {
      const [firstPart, secondPart] = splitChunk(chunk, remainingHeight)
      column.items.push(firstPart)
      column.height += firstPart.height + GAP

      // Replace the current chunk with the remainder and continue
      // This allows further splitting if the remainder is still too large
      queue[i] = secondPart
      nextColumn()
      continue
    }

    // Otherwise move to next column and try again
    nextColumn()

    // Safety: if chunk is taller than a full column, force-place it to avoid infinite loop
    if (chunk.height > usableHeight) {
      currentColumn().items.push(chunk)
      currentColumn().height += chunk.height + GAP
      i++
    }
    // Don't increment i — retry placing this chunk in the new column
  }

  pages.push(page)
  return pages
}
