export const PAGE_HEIGHT = 1122
export const HEADER_HEIGHT = 120
export const FOOTER_HEIGHT = 80
export const CONTENT_PADDING = 32
export const COLUMN_PADDING_VERTICAL = 8
export const GAP = 8

export const AVAILABLE_HEIGHT =
  PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - CONTENT_PADDING

export const PAGE_WIDTH = 794
export const CONTENT_PADDING_X = 16
export const COLUMN_GAP = 16
export const COLUMN_INNER_PADDING = 4

export function getColumnContentWidth(columns: number): number {
  const columnCount = Math.max(1, Math.floor(columns))
  const usableWidth = PAGE_WIDTH - CONTENT_PADDING_X * 2
  const totalGap = COLUMN_GAP * (columnCount - 1)
  const columnOuterWidth = (usableWidth - totalGap) / columnCount
  return Math.floor(columnOuterWidth - COLUMN_INNER_PADDING * 2)
}
