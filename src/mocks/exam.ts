import type { ColumnCount, IExamPrint } from "../types/exam";

export const MOCK_COLLUMNS: ColumnCount = 2;

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
        description:
          "<strong>Situação-problema.</strong> Uma empresa de logística modela o custo " +
          "total mensal, em milhares de reais, de operar uma frota de <em>x</em> veículos " +
          "pela função <em>C(x) = 0,5x<sup>2</sup> − 12x + 200</em>. O setor financeiro " +
          "deseja identificar o número de veículos que minimiza esse custo, pois acima ou " +
          "abaixo desse ponto a operação deixa de ser eficiente. Considerando que a função " +
          "é contínua e diferenciável para <em>x &gt; 0</em>, determine o número de veículos " +
          "que minimiza o custo mensal da frota.",
        alternatives: [
          { id: "q1a", description: "8 veículos" },
          { id: "q1b", description: "10 veículos" },
          { id: "q1c", description: "12 veículos" },
          { id: "q1d", description: "14 veículos" },
          { id: "q1e", description: "16 veículos" },
        ],
      },

      {
        id: "q2",
        description:
          'Calcule a derivada de <span class="math-tex">\\(f(x) = 3x^{4} - 2x^{3} + 7x - 5\\)</span>.<br/>' +
          '<img src="https://picsum.photos/seed/calc1/300/120" alt="gráfico da função polinomial" />',
        alternatives: [
          {
            id: "q2a",
            description: '<span class="math-tex">\\(f\'(x) = 12x^{3} - 6x^{2} + 7\\)</span>',
            correctResponse: true,
          },
          { id: "q2b", description: '<span class="math-tex">\\(f\'(x) = 12x^{3} - 6x^{2} + 7x\\)</span>' },
          { id: "q2c", description: '<span class="math-tex">\\(f\'(x) = 3x^{3} - 2x^{2} + 7\\)</span>' },
          { id: "q2d", description: '<span class="math-tex">\\(f\'(x) = 12x^{4} - 6x^{3} + 7x\\)</span>' },
          { id: "q2e", description: '<span class="math-tex">\\(f\'(x) = 12x^{3} - 6x^{2} - 5\\)</span>' },
        ],
      },

      {
        id: "q3",
        description:
          'Determine a integral indefinida de <em>f(x) = 6x<sup>2</sup> + 4x − 3</em>.<br/>' +
          '<img src="https://picsum.photos/seed/integral/800/300" alt="área sob a curva" />',
        alternatives: [
          {
            id: "q3a",
            description: "2x<sup>3</sup> + 2x<sup>2</sup> − 3x + C",
            correctResponse: true,
          },
          { id: "q3b", description: "6x<sup>3</sup> + 4x<sup>2</sup> − 3x + C" },
          { id: "q3c", description: "12x + 4 + C" },
          { id: "q3d", description: "2x<sup>3</sup> + 2x<sup>2</sup> − 3 + C" },
          { id: "q3e", description: "3x<sup>3</sup> + 2x<sup>2</sup> − 3x + C" },
        ],
      },

      {
        id: "q4",
        description:
          "Observe o gráfico de uma função <em>f</em> e sua reta tangente no ponto " +
          "destacado.<br/>" +
          '<img src="https://picsum.photos/seed/tangente/320/160" alt="função e reta tangente" />' +
          "<br/>Qual dos gráficos abaixo representa a função derivada <em>f'(x)</em>?",
        alternatives: [
          {
            id: "q4a",
            description:
              '<img src="https://picsum.photos/seed/deriv-a/160/100" alt="gráfico A" />',
          },
          {
            id: "q4b",
            description:
              '<img src="https://picsum.photos/seed/deriv-b/160/100" alt="gráfico B" />',
            correctResponse: true,
          },
          {
            id: "q4c",
            description:
              '<img src="https://picsum.photos/seed/deriv-c/160/100" alt="gráfico C" />',
          },
          {
            id: "q4d",
            description:
              '<img src="https://picsum.photos/seed/deriv-d/160/100" alt="gráfico D" />',
          },
        ],
      },

      {
        id: "q5",
        description:
          "Seja <em>f(x) = ln(x)</em>. Determine o valor de <em>f'(e)</em>, sabendo que a " +
          "derivada de ln(x) é 1/x.<br/>" +
          '<img src="https://picsum.photos/seed/ln_graph/280/150" alt="gráfico de ln(x)" />',
        alternatives: [
          { id: "q5a", description: "1" },
          { id: "q5b", description: "e" },
          {
            id: "q5c",
            description:
              '<sup>1</sup>&frasl;<sub>e</sub> &nbsp;<img src="https://picsum.photos/seed/frac/160/30" alt="fração 1 sobre e" />',
            correctResponse: true,
          },
          { id: "q5d", description: "0" },
          { id: "q5e", description: "ln(e)" },
        ],
      },

      {
        id: "q6",
        description:
          'Determine o valor da integral definida <span class="math-tex">\\(\\int_{0}^{2} (2x + 1)\\,dx\\)</span>.',
        alternatives: [
          { id: "q6a", description: "4" },
          { id: "q6b", description: "5" },
          { id: "q6c", description: "6" },
          { id: "q6d", description: "7" },
          { id: "q6e", description: "8" },
        ],
      },

      {
        id: "q7",
        description:
          "<strong>Situação-problema.</strong> Um paciente recebe uma dose inicial de um " +
          "medicamento e, a cada intervalo de tempo fixo, o organismo elimina metade da " +
          "quantidade presente, enquanto uma nova dose equivalente à metade da anterior é " +
          "administrada. A quantidade total acumulada ao longo de infinitos intervalos pode " +
          "ser representada pela série geométrica ∑<sub>n=0</sub><sup>∞</sup> (1/2)<sup>n</sup>. " +
          "Sabendo que uma série geométrica de razão <em>|r| &lt; 1</em> converge para " +
          "<em>a₁/(1 − r)</em>, para qual valor essa série converge?",
        alternatives: [
          { id: "q7a", description: "1" },
          { id: "q7b", description: "2" },
          { id: "q7c", description: "1/2" },
          { id: "q7d", description: "∞ (diverge)" },
          { id: "q7e", description: "3/2" },
        ],
      },

      {
        id: "q8",
        description:
          'Qual é o domínio da função <span class="math-tex">\\(f(x) = \\sqrt{4 - x^{2}}\\)</span>?',
        alternatives: [
          { id: "q8a", description: '<span class="math-tex">\\(x \\in \\mathbb{R}\\)</span>' },
          { id: "q8b", description: '<span class="math-tex">\\(x \\in [-2, 2]\\)</span>' },
          { id: "q8c", description: '<span class="math-tex">\\(x \\in (0, 4)\\)</span>' },
          { id: "q8d", description: '<span class="math-tex">\\(x \\in [-4, 4]\\)</span>' },
          { id: "q8e", description: '<span class="math-tex">\\(x > 0\\)</span>' },
        ],
      },

      {
        id: "q9",
        description:
          'Aplicando a regra de L\'Hôpital, calcule <span class="math-tex">\\(\\lim_{x \\to 0} \\dfrac{\\operatorname{sen}(x)}{x}\\)</span>.',
        alternatives: [
          { id: "q9a", description: "0" },
          { id: "q9b", description: "1" },
          { id: "q9c", description: "∞" },
          { id: "q9d", description: "−1" },
          { id: "q9e", description: "Não existe" },
        ],
      },

      {
        id: "q10",
        description:
          "A função <em>f(x) = e<sup>x</sup></em> é contínua em todo o seu domínio e é " +
          "amplamente utilizada para modelar fenômenos de crescimento. Com base no gráfico " +
          "abaixo, qual é o conjunto imagem dessa função?<br/>" +
          '<img src="https://picsum.photos/seed/exp_graph/320/160" alt="gráfico de e elevado a x" />',
        alternatives: [
          { id: "q10a", description: "ℝ" },
          { id: "q10b", description: "(0, +∞)" },
          { id: "q10c", description: "[0, +∞)" },
          { id: "q10d", description: "(−∞, 0)" },
          { id: "q10e", description: "[1, +∞)" },
        ],
      },

      {
        id: "q11",
        description:
          "<strong>Situação-problema.</strong> Considere a dedução abaixo, que aparece no " +
          "cálculo da radiação de corpo negro (integral de Bose–Einstein). Analise cada " +
          "passagem da igualdade e assinale o valor final correto da integral:<br/>" +
          '<span class="math-tex">\\[\\begin{aligned}' +
          ' S &= \\int_{0}^{\\infty} \\frac{x^{3}}{e^{x}-1}\\,dx' +
          ' = \\int_{0}^{\\infty} x^{3} \\sum_{n=1}^{\\infty} e^{-nx}\\,dx \\\\' +
          ' &= \\sum_{n=1}^{\\infty} \\int_{0}^{\\infty} x^{3} e^{-nx}\\,dx' +
          ' = \\sum_{n=1}^{\\infty} \\frac{3!}{n^{4}} \\\\' +
          ' &= 6 \\sum_{n=1}^{\\infty} \\frac{1}{n^{4}}' +
          ' = 6\\,\\zeta(4) = 6 \\cdot \\frac{\\pi^{4}}{90} = \\frac{\\pi^{4}}{15}' +
          ' \\end{aligned}\\]</span>',
        alternatives: [
          { id: "q11a", description: '<span class="math-tex">\\(\\dfrac{\\pi^{4}}{15}\\)</span>' },
          { id: "q11b", description: '<span class="math-tex">\\(\\dfrac{\\pi^{4}}{90}\\)</span>' },
          { id: "q11c", description: '<span class="math-tex">\\(6\\,\\zeta(4)\\)</span>' },
          { id: "q11d", description: '<span class="math-tex">\\(\\dfrac{\\pi^{2}}{6}\\)</span>' },
          { id: "q11e", description: '<span class="math-tex">\\(\\infty\\ (\\text{diverge})\\)</span>' },
        ],
      },
    ],
  },
};
