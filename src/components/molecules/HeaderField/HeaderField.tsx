import { PrintTypography } from '../../atoms/PrintTypography'
import type { HeaderFieldProps } from './HeaderField.interface'
import { Field, FieldBox } from './HeaderField.styles'

export function HeaderField({ fields, boxWidth, justify }: HeaderFieldProps) {
  return (
    <FieldBox boxWidth={boxWidth} justify={justify}>
      {fields.map((field) => (
        <Field key={field.label}>
          <PrintTypography color="DarkLow" fontSize="9px" fontWeight={400}>
            {field.label}
          </PrintTypography>
          <PrintTypography
            color="DarkPure"
            fontSize="10px"
            fontWeight={500}
            truncate={field.truncate}
          >
            {field.value}
          </PrintTypography>
        </Field>
      ))}
    </FieldBox>
  )
}
