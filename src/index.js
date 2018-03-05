import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WithRoot from './WithRoot'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
	<WithRoot>
		<App />
	</WithRoot>,
	document.getElementById('root'),
)
registerServiceWorker()

if (module.hot) {
	module.hot.accept()
}
