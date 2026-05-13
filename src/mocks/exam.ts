import type { ColumnCount, IExamPrint } from "../types/exam";

const mockRepeat = (text: string, repeat: number) =>
  Array.from({ length: repeat }, () => text).join(" ");

export const MOCK_COLLUMNS: ColumnCount = 2
export const EXAM_MOCK: IExamPrint = {
  code: "AV1-2026-MAT101",
  evaluationType: "AV1",
  version: "A",
  maxScore: 10,
  campusName: "Campus Maracanã",
  examInfo: {
    numSeqClass: "001",
    classCode: "MAT101-2026.1",
    classPeriod: "2026.1",
    tenant: "YDUQS",
    disciplineCode: "MAT101",
    disciplineName: "Cálculo Diferencial e Integral I",
    responsibleInstructor: "Prof. Dr. Carlos Eduardo Silva",
    campusName: "Campus Maracanã",
    questions: [
      {
        id: "q1",
        description: mockRepeat("questão muito grande...", 1),
        alternatives: [
          { id: "q1a", description: mockRepeat("Resposta muito grande...", 1) },
          { id: "q1b", description: "https://pt.aliexpress.com/item/1005004033266289.html?spm=a2g0o.productlist.main.29.300f8PAE8PAE3o&algo_pvid=33fbf5cb-8d9c-4ef0-82cc-44515b4a1895&algo_exp_id=33fbf5cb-8d9c-4ef0-82cc-44515b4a1895-28&pdp_ext_f=%7B%22order%22%3A%2223%22%2C%22spu_best_type%22%3A%22price%22%2C%22eval%22%3A%221%22%2C%22fromPage%22%3A%22search%22%7D&pdp_npi=6%40dis%21BRL%2198.88%2149.09%21%21%2118.58%219.23%21%402103123917786947784938499e6ad2%2112000027807988414%21sea%21BR%210%21ABX%211%210%21n_tag%3A-29910%3Bd%3Ade6427a6%3Bm03_new_user%3A-29895%3BpisId%3A5000000203733409&curPageLogUid=6prtGMo58y9I&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005004033266289%7C_p_origin_prod%3A" },
          { id: "q1c", description: "2", correctResponse: true },
          { id: "q1d", description: "Não existe" },
          { id: "q1e", description: "∞" },
        ],
      },
      {
        id: "q2",
        description:
          'Calcule a derivada de f(x) = 3x⁴ - 2x³ + 7x - 5. <br/><img src="https://picsum.photos/seed/calc1/300/120" alt="gráfico da função" />',
        alternatives: [
          { id: "q2a", description: "12x³ - 6x² + 7", correctResponse: true },
          { id: "q2b", description: "12x³ - 6x² + 7x" },
          { id: "q2c", description: "3x³ - 2x² + 7" },
          { id: "q2d", description: '12x⁴ - 6x³ + 7x' },
          { id: "q2e", description: "12x³ - 6x² - 5" },
        ],
      },
      {
        id: "q3",
        description:
          'Qual é a integral indefinida de f(x) = 6x² + 4x - 3? Analise o gráfico abaixo: <img src="https://picsum.photos/800/400" alt="expressão" />',
        alternatives: [
          {
            id: "q3a",
            description: "2x³ + 2x² - 3x + C",
            correctResponse: true,
          },
          { id: "q3b", description: "6x³ + 4x² - 3x + C" },
          { id: "q3c", description: "12x + 4 + C" },
          { id: "q3d", description: "2x³ + 2x² - 3 + C" },
          { id: "q3e", description: "3x³ + 2x² - 3x + C" },
        ],
      },
      {
        id: "q4",
        description:
          "https://pt.aliexpress.com/item/1005004033266289.html?spm=a2g0o.productlist.main.29.300f8PAE8PAE3o&algo_pvid=33fbf5cb-8d9c-4ef0-82cc-44515b4a1895&algo_exp_id=33fbf5cb-8d9c-4ef0-82cc-44515b4a1895-28&pdp_ext_f=%7B%22order%22%3A%2223%22%2C%22spu_best_type%22%3A%22price%22%2C%22eval%22%3A%221%22%2C%22fromPage%22%3A%22search%22%7D&pdp_npi=6%40dis%21BRL%2198.88%2149.09%21%21%2118.58%219.23%21%402103123917786947784938499e6ad2%2112000027807988414%21sea%21BR%210%21ABX%211%210%21n_tag%3A-29910%3Bd%3Ade6427a6%3Bm03_new_user%3A-29895%3BpisId%3A5000000203733409&curPageLogUid=6prtGMo58y9I&utparam-url=scene%3Asearch%7Cquery_from%3A%7Cx_object_id%3A1005004033266289%7C_p_origin_prod%3A",
        alternatives: [
          { id: "q4a", description: "x = 0" },
          { id: "q4b", description: "x = 1", correctResponse: true },
          { id: "q4c", description: "x = 2" },
          { id: "q4d", description: "x = -1" },
          { id: "q4e", description: "x = 3" },
        ],
      },
      {
        id: "q5",
        description:
          'Seja f(x) = ln(x). Determine f\'(e). Observe o gráfico abaixo: <br/><img src="https://picsum.photos/seed/ln_graph/280/150" alt="gráfico de ln(x)" />',
        alternatives: [
          { id: "q5a", description: "1" },
          { id: "q5b", description: "e" },
          { id: "q5c", description: '1/e <img src="https://picsum.photos/seed/frac/60/30" alt="fração" />', correctResponse: true },
          { id: "q5d", description: "0" },
          { id: "q5e", description: "ln(e)" },
        ],
      },
      {
        id: "q6",
        description: "Determine o valor de ∫₀² (2x + 1) dx.",
        alternatives: [
          { id: "q6a", description: "4" },
          { id: "q6b", description: "5" },
          { id: "q6c", description: "6", correctResponse: true },
          { id: "q6d", description: "7" },
          { id: "q6e", description: "8" },
        ],
      },
      {
        id: "q7",
        description: "A série geométrica ∑(n=0 até ∞) (1/2)ⁿ converge para:",
        alternatives: [
          { id: "q7a", description: "1" },
          { id: "q7b", description: "2", correctResponse: true },
          { id: "q7c", description: "1/2" },
          { id: "q7d", description: "∞" },
          { id: "q7e", description: "Não converge" },
        ],
      },
      {
        id: "q8",
        description: "Qual é o domínio da função f(x) = √(4 - x²)?",
        alternatives: [
          { id: "q8a", description: "x ∈ ℝ" },
          { id: "q8b", description: "x ∈ [-2, 2]", correctResponse: true },
          { id: "q8c", description: "x ∈ (0, 4)" },
          { id: "q8d", description: "x ∈ [-4, 4]" },
          { id: "q8e", description: "x > 0" },
        ],
      },
      {
        id: "q9",
        description:
          "Aplicando a regra de L'Hôpital, calcule lim(x→0) sen(x)/x.",
        alternatives: [
          { id: "q9a", description: "0" },
          { id: "q9b", description: "1", correctResponse: true },
          { id: "q9c", description: "∞" },
          { id: "q9d", description: "-1" },
          { id: "q9e", description: "Não existe" },
        ],
      },
      {
        id: "q10",
        description:
          "A função f(x) = eˣ é contínua em todo o seu domínio. Qual é a sua imagem?",
        alternatives: [
          { id: "q10a", description: "ℝ" },
          { id: "q10b", description: "(0, +∞)", correctResponse: true },
          { id: "q10c", description: "[0, +∞)" },
          { id: "q10d", description: "(-∞, 0)" },
          { id: "q10e", description: "[1, +∞)" },
        ],
      },
    ],
  },
};
