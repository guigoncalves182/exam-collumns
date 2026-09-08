import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { HeaderField } from './HeaderField'

describe('HeaderField', () => {
  it('deve renderizar o rótulo e o valor de um campo', () => {
    renderWithTheme(
      <HeaderField fields={[{ label: 'Nome:', value: 'João da Silva' }]} />,
    )

    expect(screen.getByText('Nome:')).toBeInTheDocument()
    expect(screen.getByText('João da Silva')).toBeInTheDocument()
  })

  it('deve renderizar múltiplos campos', () => {
    renderWithTheme(
      <HeaderField
        fields={[
          { label: 'Unid.:', value: 'Campus Maracanã' },
          { label: 'Tur.:', value: 'MAT101' },
        ]}
      />,
    )

    expect(screen.getByText('Unid.:')).toBeInTheDocument()
    expect(screen.getByText('Campus Maracanã')).toBeInTheDocument()
    expect(screen.getByText('Tur.:')).toBeInTheDocument()
    expect(screen.getByText('MAT101')).toBeInTheDocument()
  })

  it('deve aplicar a classe truncate no valor quando truncate for verdadeiro', () => {
    renderWithTheme(
      <HeaderField
        fields={[{ label: 'Disciplina:', value: 'Cálculo I', truncate: true }]}
      />,
    )

    expect(screen.getByText('Cálculo I')).toHaveClass('truncate')
  })

  it('não deve aplicar a classe truncate quando não informado', () => {
    renderWithTheme(
      <HeaderField fields={[{ label: 'Disciplina:', value: 'Cálculo I' }]} />,
    )

    expect(screen.getByText('Cálculo I')).not.toHaveClass('truncate')
  })

  it('deve renderizar o rótulo mesmo quando o valor está ausente', () => {
    renderWithTheme(<HeaderField fields={[{ label: 'Prof.:' }]} />)

    expect(screen.getByText('Prof.:')).toBeInTheDocument()
  })
})
