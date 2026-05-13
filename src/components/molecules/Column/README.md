# Column

**Nível:** Molecule

## Descrição

O `Column` representa uma coluna de conteúdo dentro da área de impressão da prova. Cada página possui duas colunas lado a lado, e cada coluna renderiza uma lista ordenada de `Chunk`s que foram distribuídos pelo algoritmo de paginação.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `MeasuredChunk[]` | Lista de chunks já medidos e posicionados para esta coluna |

## Uso

```tsx
import { Column } from '@/components/molecules/Column'

<Column items={measuredChunks} />
```

## Comportamento

- Renderiza os chunks na ordem em que foram distribuídos pelo paginador.
- O overflow é ocultado para garantir que o conteúdo não ultrapasse os limites visuais da coluna.
- Cada chunk é espaçado com um gap de 8px via CSS flexbox.
