# Exam

**Nível:** Template

## Descrição

O `Exam` é o template principal que orquestra toda a renderização da prova. Ele coordena o fluxo de medição → paginação → renderização, gerando múltiplas páginas a partir dos dados da prova.

## Fluxo de funcionamento

```
IExamPrint
    │
    ▼
useExamPagination (hook)
    │
    ├── createChunks()     → transforma questões em ChunkData[]
    ├── MeasureRoot        → mede alturas reais no DOM
    ├── paginateChunks()   → distribui chunks em páginas/colunas
    │
    ▼
PageData[] → renderiza N componentes <Page />
```

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `exam` | `IExamPrint` | Objeto completo da prova com metadados e questões |

## Uso

```tsx
import { Exam } from '@/components/templates/Exam'

<Exam exam={examData} />
```

## Responsabilidades

1. **Medição:** Renderiza o `MeasureRoot` oculto para obter alturas reais dos chunks.
2. **Paginação:** Usa o hook `useExamPagination` para distribuir conteúdo inteligentemente.
3. **Renderização:** Gera uma lista de `Page` components com os dados paginados.

## Observações

- Aguarda carregamento de fontes e imagens antes de paginar.
- Suporta splitting de chunks longos (enunciados/alternativas) entre colunas/páginas.
- O container usa flexbox vertical com gap de 32px entre páginas (removido em print).
