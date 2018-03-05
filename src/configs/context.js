import { create } from 'jss'
import preset from 'jss-preset-default'
import { SheetsRegistry } from 'react-jss/lib/jss'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

// Configure JSS
export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName

export const sheetsRegistry = new SheetsRegistry()
