import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { VersionPill } from './VersionPill'

describe('VersionPill', () => {
  it('deve exibir a versão informada', () => {
    renderWithTheme(<VersionPill version="A" />)

    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('deve refletir diferentes valores de versão', () => {
    renderWithTheme(<VersionPill version="B2" />)

    expect(screen.getByText('B2')).toBeInTheDocument()
  })
})
