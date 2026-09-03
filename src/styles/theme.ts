import * as globals from '@lift/design-tokens/dist/ts/globals'
import * as yduqs from '@lift/design-tokens/dist/ts/yduqs/default'

/**
 * Emotion theme built exactly like the Lift `LftProvider`:
 * global tokens merged with the brand (yduqs / default template) tokens.
 * This gives styled-components access to `theme.NeutralColorDarkLow`,
 * `theme.SpacingSizeXxxs`, `theme.BrandLogoDefault`, etc.
 */
export const theme = { ...globals, ...yduqs }

export type AppTheme = typeof theme
