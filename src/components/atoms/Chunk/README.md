# Chunk

**Nível:** Atom

## Descrição

O `Chunk` é a menor unidade visual do sistema de impressão de provas. Ele renderiza um fragmento individual de conteúdo de uma questão.

## Tipos de Chunk

| Tipo | Renderização |
|------|-------------|
| `header` | Título da questão (ex: "Questão 1") com borda inferior |
| `statement` | Enunciado da questão, suporta HTML (imagens, formatação) |
| `alternative` | Alternativa de resposta, suporta HTML inline |

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `chunk` | `ChunkData` | Objeto contendo `id`, `questionId`, `type` e `content` |

## Uso

```tsx
import { Chunk } from '@/components/atoms/Chunk'

<Chunk chunk={{ id: 'q1-header', questionId: 'q1', type: 'header', content: 'Questão 1' }} />
```

## Observações

- Utiliza `dangerouslySetInnerHTML` para `statement` e `alternative` pois o conteúdo pode conter imagens e formatação HTML.
- Não possui estado interno — é um componente puramente presentacional.
