# ExamContent

**Nível:** Organism

## Descrição

O `ExamContent` é a área principal de conteúdo de uma página da prova. Organiza o conteúdo em um grid de duas colunas, renderizando os chunks que foram distribuídos pelo algoritmo de paginação.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `page` | `PageData` | Dados da página contendo as duas colunas com seus chunks |

## Estrutura

```
┌─────────────────────────────────┐
│  Column 0      │   Column 1     │
│  (esquerda)    │   (direita)    │
│                │                │
│  Chunk...      │   Chunk...     │
│  Chunk...      │   Chunk...     │
└─────────────────────────────────┘
```

## Uso

```tsx
import { ExamContent } from '@/components/organisms/ExamContent'

<ExamContent page={pageData} />
```

## Observações

- Utiliza CSS Grid com `grid-template-columns: 1fr 1fr` para dividir igualmente.
- O overflow é oculto para garantir que o conteúdo respeite os limites da página.
- O padding interno é de 16px em todos os lados.
