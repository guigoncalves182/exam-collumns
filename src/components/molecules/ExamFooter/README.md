# ExamFooter

**Nível:** Molecule

## Descrição

O `ExamFooter` exibe o rodapé de cada página da prova, mostrando a numeração de páginas no formato "Página X de Y".

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `currentPage` | `number` | Número da página atual (1-indexed) |
| `totalPages` | `number` | Total de páginas da prova |

## Uso

```tsx
import { ExamFooter } from '@/components/molecules/ExamFooter'

<ExamFooter currentPage={1} totalPages={3} />
```

## Observações

- Altura fixa de 40px.
- Texto alinhado à direita.
- Separado do conteúdo por uma borda superior sutil.
