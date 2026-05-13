# ExamHeader

**Nível:** Molecule

## Descrição

O `ExamHeader` exibe o cabeçalho de cada página da prova impressa. Contém as informações institucionais, metadados da avaliação e campo para nome do aluno.

## Informações exibidas

- **Bloco esquerdo:** Nome da disciplina, código, turma e período
- **Bloco direito:** Tipo de avaliação, versão, código da prova e valor máximo
- **Rodapé do header:** Campus, professor responsável e campo "Nome"

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `exam` | `IExamPrint` | Objeto completo da prova com todas as informações |

## Uso

```tsx
import { ExamHeader } from '@/components/molecules/ExamHeader'

<ExamHeader exam={examData} />
```

## Observações

- O campus é resolvido com fallback: `exam.campusName ?? examInfo.campusName`.
- O campo do professor só é renderizado se `responsibleInstructor` estiver preenchido.
- Altura mínima fixa de 120px para manter consistência entre páginas.
