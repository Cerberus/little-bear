import React, { type Node } from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { blue, pink } from 'material-ui/colors'
import {
	createMuiTheme,
	MuiThemeProvider,
	withStyles,
} from 'material-ui/styles'
import 'typeface-roboto' // eslint-disable-line import/extensions
import { jss, sheetsRegistry } from './configs/context'

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
		type: 'dark', // TODO: use variable from user profile
	},
})

const style = theme => ({
	'@global': {
		html: {
			background: theme.palette.background.default,
			WebkitFontSmoothing: 'antialiased', // Antialiasing.
			MozOsxFontSmoothing: 'grayscale', // Antialiasing.
		},
		body: {
			margin: 0,
		},
	},
})

const Wrapper = withStyles(style)(({ children }) => children)

const Props = {
	children: Node,
}

const withRoot = ({ children }: Props) => (
	<JssProvider jss={jss} registry={sheetsRegistry}>
		<MuiThemeProvider theme={theme} sheetsManager={new Map()}>
			<Wrapper>{children}</Wrapper>
		</MuiThemeProvider>
	</JssProvider>
)

export default withRoot
