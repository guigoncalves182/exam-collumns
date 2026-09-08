import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { buildExam } from '../../../test/fixtures'
import { ExamHeader } from './ExamHeader'

describe('ExamHeader', () => {
  it('deve exibir o código, o tipo de avaliação, o período e a versão', () => {
    const exam = buildExam()
    renderWithTheme(<ExamHeader exam={exam} />)

    expect(screen.getByText(exam.code)).toBeInTheDocument()
    expect(screen.getByText(exam.evaluationType)).toBeInTheDocument()
    expect(screen.getByText(exam.examInfo.classPeriod)).toBeInTheDocument()
    expect(screen.getByText(exam.version)).toBeInTheDocument()
  })

  it('deve exibir os dados da disciplina, do professor e da turma', () => {
    const exam = buildExam()
    renderWithTheme(<ExamHeader exam={exam} />)

    expect(screen.getByText(exam.examInfo.disciplineName)).toBeInTheDocument()
    expect(
      screen.getByText(exam.examInfo.responsibleInstructor as string),
    ).toBeInTheDocument()
    expect(screen.getByText(exam.examInfo.classCode)).toBeInTheDocument()
  })

  it('deve exibir o nome e a matrícula do aluno quando informados', () => {
    renderWithTheme(
      <ExamHeader
        exam={buildExam()}
        studentName="Maria Souza"
        studentEnrollment="20260001"
      />,
    )

    expect(screen.getByText('Maria Souza')).toBeInTheDocument()
    expect(screen.getByText('20260001')).toBeInTheDocument()
  })

  it('deve priorizar o campus do nível raiz do exame', () => {
    const exam = buildExam({
      campusName: 'Campus Nova Iguaçu',
      examInfo: { ...buildExam().examInfo, campusName: 'Campus Interno' },
    })

    renderWithTheme(<ExamHeader exam={exam} />)

    expect(screen.getByText('Campus Nova Iguaçu')).toBeInTheDocument()
  })

  it('deve usar o texto de indisponibilidade quando não houver campus', () => {
    const base = buildExam()
    const exam = buildExam({
      campusName: undefined,
      examInfo: { ...base.examInfo, campusName: undefined },
    })

    renderWithTheme(<ExamHeader exam={exam} />)

    expect(screen.getByText('Informação indisponível')).toBeInTheDocument()
  })

  it('deve exibir o alerta quando presente no exame', () => {
    const base = buildExam()
    const exam = buildExam({
      examInfo: {
        ...base.examInfo,
        alert: { title: 'Atenção', message: 'Leia com cuidado' },
      },
    })

    renderWithTheme(<ExamHeader exam={exam} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Atenção')
    expect(screen.getByRole('alert')).toHaveTextContent('Leia com cuidado')
  })

  it('não deve exibir alerta quando o exame não possui alerta', () => {
    renderWithTheme(<ExamHeader exam={buildExam()} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('deve renderizar o logo com o alt baseado no tenant', () => {
    renderWithTheme(<ExamHeader exam={buildExam()} />)

    expect(screen.getByRole('img', { name: 'YDUQS logo' })).toBeInTheDocument()
  })
})
