import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { render, type RenderOptions } from '@testing-library/react'

/**
 * Tema mínimo usado nos testes. Contém apenas os tokens consumidos pelos
 * componentes, evitando depender do pacote real de design-tokens.
 */
export const mockTheme = {
  FontFamilyBase: 'Arial, sans-serif',
  NeutralColorDarkPure: '#000000',
  NeutralColorDarkLow: '#666666',
  NeutralColorLightPure: '#FFFFFF',
  BrandLogoDefault: 'PHN2Zz48L3N2Zz4=',
} as const

function AllProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
}

/**
 * Renderiza um componente já embrulhado no ThemeProvider com o tema de teste.
 * Espelha o helper `renderWithTheme` utilizado no sirius-docente.
 */
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
