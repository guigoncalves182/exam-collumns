# MeasureRoot

**Nível:** Molecule

## Descrição

O `MeasureRoot` é um componente auxiliar invisível que renderiza todos os chunks fora da tela para medir suas alturas reais no DOM. Essas medições são essenciais para o algoritmo de paginação distribuir corretamente o conteúdo entre colunas e páginas.

## Como funciona

1. Renderiza todos os `Chunk`s dentro de um container oculto (posicionado fora da viewport).
2. O container tem largura fixa de 355px (metade da área de conteúdo da página).
3. Expõe um método `getMeasurement(id)` via `useImperativeHandle` que retorna a altura medida de cada chunk.

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `chunks` | `ChunkData[]` | Lista de todos os chunks a serem medidos |

## Ref (MeasureRootHandle)

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `getMeasurement(id)` | `number` | Altura em pixels do chunk com o ID fornecido |

## Uso

```tsx
import { MeasureRoot } from '@/components/molecules/MeasureRoot'

const measureRef = useRef<MeasureRootHandle>(null)

<MeasureRoot ref={measureRef} chunks={allChunks} />

// Após renderização:
const height = measureRef.current?.getMeasurement('q1-statement')
```

## Observações

- Utiliza `forwardRef` + `useImperativeHandle` para expor a API de medição.
- O container é `visibility: hidden` e posicionado em `left: -99999px` para não afetar o layout visível.
- As medições devem ser feitas após fontes e imagens estarem carregadas para precisão.
