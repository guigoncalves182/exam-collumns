import type { ExamHeaderProps } from './ExamHeader.interface'
import styles from '../../../styles/Exam.module.css'

export function ExamHeader({ exam }: ExamHeaderProps) {
  const { examInfo, code, evaluationType, version, maxScore } = exam
  const campus = exam.campusName ?? examInfo.campusName

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerInfo}>
          <strong>{examInfo.disciplineName}</strong>
          <span>Código: {examInfo.disciplineCode}</span>
          <span>Turma: {examInfo.classCode} | Período: {examInfo.classPeriod}</span>
        </div>
        <div className={styles.headerMeta}>
          <span>{evaluationType} — Versão {version}</span>
          <span>Cód. Prova: {code}</span>
          <span>Valor: {maxScore} pts</span>
        </div>
      </div>
      <div className={styles.headerBottom}>
        {campus && <span>{campus}</span>}
        {examInfo.responsibleInstructor && (
          <span>Prof.: {examInfo.responsibleInstructor}</span>
        )}
        <div className={styles.studentName}>
          Nome:__________________________________________
        </div>
      </div>
    </div>
  )
}
