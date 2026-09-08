import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { PrintTypography } from './PrintTypography'

describe('PrintTypography', () => {
  it('deve renderizar o texto informado', () => {
    renderWithTheme(
      <PrintTypography color="DarkPure" fontSize="10px" fontWeight={400}>
        Texto de teste
      </PrintTypography>,
    )

    expect(screen.getByText('Texto de teste')).toBeInTheDocument()
  })

  it('não deve aplicar a classe truncate por padrão', () => {
    renderWithTheme(
      <PrintTypography color="DarkPure" fontSize="10px" fontWeight={400}>
        Sem truncate
      </PrintTypography>,
    )

    expect(screen.getByText('Sem truncate')).not.toHaveClass('truncate')
  })

  it('deve aplicar a classe truncate quando truncate for verdadeiro', () => {
    renderWithTheme(
      <PrintTypography color="DarkPure" fontSize="10px" fontWeight={400} truncate>
        Com truncate
      </PrintTypography>,
    )

    expect(screen.getByText('Com truncate')).toHaveClass('truncate')
  })

  it('deve aplicar o tamanho e o peso da fonte informados', () => {
    renderWithTheme(
      <PrintTypography color="DarkPure" fontSize="16px" fontWeight={700}>
        Estilizado
      </PrintTypography>,
    )

    const element = screen.getByText('Estilizado')
    expect(element).toHaveStyle('font-size: 16px')
    expect(element).toHaveStyle('font-weight: 700')
  })

  it('deve renderizar como um elemento span', () => {
    renderWithTheme(
      <PrintTypography color="LightPure" fontSize="9px" fontWeight={400}>
        Conteúdo
      </PrintTypography>,
    )

    expect(screen.getByText('Conteúdo').tagName).toBe('SPAN')
  })
})
