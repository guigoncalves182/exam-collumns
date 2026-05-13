# Page

**Nível:** Organism

## Descrição

O `Page` representa uma página completa da prova impressa. Compõe o layout final combinando header, conteúdo e footer em uma estrutura com dimensões fixas de papel A4 (794×1122px).

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `exam` | `IExamPrint` | Dados completos da prova (para o header) |
| `page` | `PageData` | Dados da página com as duas colunas de chunks |
| `pageIndex` | `number` | Índice da página (0-indexed) |
| `totalPages` | `number` | Total de páginas da prova |

## Estrutura

```
┌──────────────────────────────┐
│         ExamHeader           │  ← 120px min
├──────────────────────────────┤
│                              │
│         ExamContent          │  ← flex: 1
│    (2 colunas de chunks)     │
│                              │
├──────────────────────────────┤
│         ExamFooter           │  ← 40px
└──────────────────────────────┘
        794px × 1122px
```

## Uso

```tsx
import { Page } from '@/components/organisms/Page'

<Page exam={examData} page={pageData} pageIndex={0} totalPages={3} />
```

## Observações

- Dimensões fixas simulam uma folha A4 para impressão.
- Em `@media print`, o `box-shadow` é removido e `page-break-after: always` é aplicado.
