import type { ChunkData, ColumnCount, IExamPrint } from '../../../types/exam'

export interface MeasureRootHandle {
  getMeasurement(id: string): number
  /**
   * Real, measured height (in px) available for stacking chunks inside a
   * single column, accounting for the actual rendered header and footer.
   */
  getAvailableHeight(): number
}

export interface MeasureRootProps {
  readonly chunks: ChunkData[]
  readonly columns?: ColumnCount
  readonly exam: IExamPrint
}
