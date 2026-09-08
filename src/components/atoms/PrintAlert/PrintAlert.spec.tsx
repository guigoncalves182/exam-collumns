import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { PrintAlert } from './PrintAlert'

describe('PrintAlert', () => {
  const props = {
    title: 'Título do alerta',
    message: 'Mensagem do alerta para os alunos',
  }

  it('deve renderizar o título e a mensagem', () => {
    renderWithTheme(<PrintAlert {...props} />)

    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.message)).toBeInTheDocument()
  })

  it('deve expor o container com o papel de alerta (role="alert")', () => {
    renderWithTheme(<PrintAlert {...props} />)

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveTextContent(props.title)
    expect(alert).toHaveTextContent(props.message)
  })
})
