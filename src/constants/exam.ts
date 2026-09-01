export const PAGE_HEIGHT = 1122
export const HEADER_HEIGHT = 120
export const FOOTER_HEIGHT = 80
export const CONTENT_PADDING = 32
// Vertical padding of a single column (.column), top + bottom
export const COLUMN_PADDING_VERTICAL = 8
export const GAP = 8

// Fallback used only when the real available height cannot be measured at
// runtime (e.g. no DOM). The runtime measurement in MeasureRoot is preferred.
export const AVAILABLE_HEIGHT =
  PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - CONTENT_PADDING

/* --- Horizontal layout (used to measure column width for any column count) --- */
export const PAGE_WIDTH = 794
// Horizontal padding of the content area (.content / .contentSingle), each side
export const CONTENT_PADDING_X = 16
// Gap between columns in the content grid (.content)
export const COLUMN_GAP = 16
// Padding of each column (.column), each side
export const COLUMN_INNER_PADDING = 4

/**
 * Computes the inner content width (in px) of a single column for a given
 * number of columns, matching how the page grid renders them. Used by the
 * off-screen MeasureRoot so that measured heights reflect the real layout.
 */
export function getColumnContentWidth(columns: number): number {
  const columnCount = Math.max(1, Math.floor(columns))
  const usableWidth = PAGE_WIDTH - CONTENT_PADDING_X * 2
  const totalGap = COLUMN_GAP * (columnCount - 1)
  const columnOuterWidth = (usableWidth - totalGap) / columnCount
  return Math.floor(columnOuterWidth - COLUMN_INNER_PADDING * 2)
}
