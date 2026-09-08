# exam

Protótipo de montagem e impressão de prova. Renderiza uma prova em páginas A4, paginando o conteúdo em colunas com medição real de altura, e imprime pelo navegador (`Ctrl+P` / Salvar como PDF).

## Stack

- React + TypeScript + Vite
- Emotion (`@emotion/react` / `@emotion/styled`) para estilo
- Tokens do design system Lift (`@lift/design-tokens`)
- MathJax via `better-react-mathjax` (fórmulas TeX)

## Scripts

```bash
yarn dev      # ambiente de desenvolvimento
yarn build    # type-check + build de produção
yarn lint     # eslint
yarn preview  # preview do build
```

## Estrutura

Componentes seguem atomic design em `src/components` (`atoms`, `molecules`, `organisms`, `templates`). Cada componente tem `Componente.tsx`, `Componente.styles.ts`, `Componente.interface.ts` e `index.ts`.

- `templates/Exam` — compõe a prova (medição + páginas)
- `organisms/Page`, `organisms/ExamContent` — página A4 e área de conteúdo em colunas
- `molecules/ExamHeader`, `molecules/ExamFooter`, `molecules/HeaderField`, `molecules/Column`, `molecules/MeasureRoot`
- `atoms/Chunk`, `atoms/PrintTypography`, `atoms/VersionPill`, `atoms/BrandLogo`, `atoms/PrintAlert`
- `hooks/useExamPagination.ts` — orquestra medição e paginação
- `utils/exam.ts` — geração de chunks e algoritmo de paginação
- `constants/exam.ts` — dimensões A4 e layout
- `styles/theme.ts` — tema Emotion a partir dos tokens Lift
- `config/mathjax.ts` — configuração do MathJax
- `mocks/exam.ts` — prova de exemplo

## Como funciona

1. Cada questão é quebrada em chunks (cabeçalho, enunciado, alternativas).
2. O `MeasureRoot` renderiza os chunks fora da tela para medir a altura real, aguardando fontes, imagens e o MathJax.
3. `paginateChunks` distribui os chunks em colunas/páginas, sem cortar tags HTML, imagens ou fórmulas, e evitando cabeçalho órfão.
4. As páginas são renderizadas em quadros A4; a impressão usa o diálogo do navegador.

## API principal

```tsx
import { Exam } from './components/templates/Exam'

<Exam exam={examData} columns={1} />
```

- `exam: IExamPrint` — dados da prova
- `columns: number` — quantidade de colunas por página (padrão 2)

## Impressão

O layout usa dimensões reais de A4 e `@media print`. O `MeasureRoot` é ocultado na impressão e a quebra de página não é aplicada na última página, evitando folha em branco no final.
