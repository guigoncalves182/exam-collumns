export interface IExamPrintAlternative {
  id: string
  description: string
  correctResponse?: boolean
  commentedAnswer?: string
}

export interface IExamPrintQuestion {
  id: string
  description: string
  alternatives: IExamPrintAlternative[]
}

export interface IExamPrintAlert {
  title: string
  message: string
}

export interface IExamInfo {
  numSeqClass: string
  classCode: string
  classPeriod: string
  tenant: string
  disciplineCode: string
  disciplineName: string
  responsibleInstructor?: string
  alert?: IExamPrintAlert
  questions: IExamPrintQuestion[]
  campusName?: string
}

export interface IExamPrint {
  examInfo: IExamInfo
  code: string
  evaluationType: string
  version: string
  maxScore: number
  campusName?: string
}

export interface ChunkData {
  id: string
  questionId: string
  type: 'header' | 'statement' | 'alternative'
  content: string
}

export interface MeasuredChunk extends ChunkData {
  height: number
}

export interface ColumnData {
  height: number
  items: MeasuredChunk[]
}

export interface PageData {
  columns: ColumnData[]
}

export type ColumnCount = number
