import { Global, css } from '@emotion/react'

const globalCss = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 24px;
    background: #111;
    font-family: Arial, sans-serif;
  }

  @media print {
    body {
      padding: 0;
      background: white;
    }

    @page {
      size: A4;
      margin: 0;
    }
  }
`

export function GlobalStyles() {
  return <Global styles={globalCss} />
}
