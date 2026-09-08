import * as globals from '@lift/design-tokens/dist/ts/globals'
import * as yduqs from '@lift/design-tokens/dist/ts/yduqs/default'

export const theme = { ...globals, ...yduqs }

export type AppTheme = typeof theme
