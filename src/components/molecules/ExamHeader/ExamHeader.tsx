import type { ExamHeaderProps } from './ExamHeader.interface'
import { BrandLogo } from '../../atoms/BrandLogo'
import { PrintTypography } from '../../atoms/PrintTypography'
import { VersionPill } from '../../atoms/VersionPill'
import { PrintAlert } from '../../atoms/PrintAlert'
import { HeaderField } from '../HeaderField'
import {
  CodeBox,
  FieldsRow,
  FieldsSection,
  HeaderContainer,
  LogoAndId,
  TypeAndPeriod,
  VersionBox,
} from './ExamHeader.styles'

const HEADER_LABELS = {
  evaluationCode: 'Código da Avaliação',
  name: 'Nome:',
  enrollment: 'Matrícula:',
  discipline: 'Disciplina:',
  instructor: 'Prof.:',
  class: 'Tur.:',
  date: 'Data:',
  dateValue: '           /      /           ',
  campus: 'Unid.:',
  campusUnavailable: 'Informação indisponível',
} as const

export function ExamHeader({ exam, studentName = '', studentEnrollment = '' }: ExamHeaderProps) {
  const { examInfo, code, evaluationType, version } = exam
  const campus = exam.campusName ?? examInfo.campusName ?? HEADER_LABELS.campusUnavailable

  return (
    <HeaderContainer>
      <LogoAndId>
        <BrandLogo alt={`${examInfo.tenant} logo`} />

        <CodeBox>
          <PrintTypography color="DarkLow" fontSize="9px" fontWeight={400}>
            {HEADER_LABELS.evaluationCode}
          </PrintTypography>
          <PrintTypography color="DarkPure" fontSize="16px" fontWeight={700}>
            {code}
          </PrintTypography>
        </CodeBox>

        <VersionBox>
          <TypeAndPeriod>
            <PrintTypography color="DarkPure" fontSize="16px" fontWeight={700}>
              {evaluationType}
            </PrintTypography>
            <PrintTypography color="DarkLow" fontSize="9px" fontWeight={400}>
              {examInfo.classPeriod}
            </PrintTypography>
          </TypeAndPeriod>
          <VersionPill version={version} />
        </VersionBox>
      </LogoAndId>

      <FieldsSection>
        {Array.from({ length: 1 }, (_, index) => (
          <FieldsRow key={index}>
            <HeaderField fields={[{ label: HEADER_LABELS.name, value: studentName, truncate: true }]} />
            <HeaderField
              boxWidth="200px"
              fields={[{ label: HEADER_LABELS.enrollment, value: studentEnrollment, truncate: true }]}
            />
          </FieldsRow>
        ))}

        <FieldsRow>
          <HeaderField
            fields={[{ label: HEADER_LABELS.discipline, value: examInfo.disciplineName, truncate: true }]}
          />
          <HeaderField
            boxWidth="320px"
            fields={[{ label: HEADER_LABELS.instructor, value: examInfo.responsibleInstructor, truncate: true }]}
          />
        </FieldsRow>

        <FieldsRow>
          <HeaderField
            justify="space-between"
            fields={[
              { label: HEADER_LABELS.campus, value: campus, truncate: true },
              { label: HEADER_LABELS.class, value: examInfo.classCode },
            ]}
          />
          <HeaderField
            boxWidth="200px"
            fields={[{ label: HEADER_LABELS.date, value: HEADER_LABELS.dateValue }]}
          />
        </FieldsRow>
      </FieldsSection>

      {examInfo.alert && (
        <PrintAlert title={examInfo.alert.title} message={examInfo.alert.message} />
      )}
    </HeaderContainer>
  )
}
