import { describe, expect, it } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { mockTheme } from '../../../test/test-utils'
import { BrandLogo } from './BrandLogo'

describe('BrandLogo', () => {
  it('deve renderizar uma imagem com o alt padrão', () => {
    renderWithTheme(<BrandLogo />)

    expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument()
  })

  it('deve usar o alt informado via props', () => {
    renderWithTheme(<BrandLogo alt="YDUQS logo" />)

    expect(screen.getByRole('img', { name: 'YDUQS logo' })).toBeInTheDocument()
  })

  it('deve montar o src a partir do token BrandLogoDefault do tema', () => {
    renderWithTheme(<BrandLogo />)

    const img = screen.getByRole('img', { name: 'logo' })
    expect(img).toHaveAttribute(
      'src',
      `data:image/svg+xml;base64,${mockTheme.BrandLogoDefault}`,
    )
  })
})
