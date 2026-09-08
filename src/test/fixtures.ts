import type {
  IExamPrint,
  IExamPrintQuestion,
  MeasuredChunk,
  PageData,
} from '../types/exam'

export const buildQuestion = (
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

export const buildExam = (overrides: Partial<IExamPrint> = {}): IExamPrint => ({
  code: 'AV1-2026-MAT101',
  evaluationType: 'AV1',
  version: 'A',
  maxScore: 10,
  campusName: 'Campus Maracanã',
  examInfo: {
    numSeqClass: '001',
    classCode: 'MAT101-2026.1',
    classPeriod: '2026.1',
    tenant: 'YDUQS',
    disciplineCode: 'MAT101',
    disciplineName: 'Cálculo Diferencial e Integral I',
    responsibleInstructor: 'Prof. Dr. Carlos Eduardo Silva',
    campusName: 'Campus Maracanã',
    questions: [buildQuestion()],
  },
  ...overrides,
})

export const measuredChunk = (
  overrides: Partial<MeasuredChunk> = {},
): MeasuredChunk => ({
  id: 'c',
  questionId: 'q1',
  type: 'header',
  content: 'Questão 1',
  height: 20,
  ...overrides,
})

export const buildPage = (columns: MeasuredChunk[][]): PageData => ({
  columns: columns.map((items) => ({
    height: items.reduce((total, item) => total + item.height, 0),
    items,
  })),
})
