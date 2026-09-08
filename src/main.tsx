import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { MathJaxContext } from 'better-react-mathjax'
import App from './App.tsx'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { MATHJAX_CONFIG } from './config/mathjax'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathJaxContext
      version={2}
      config={MATHJAX_CONFIG}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </MathJaxContext>
  </StrictMode>,
)
