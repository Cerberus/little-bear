import { Button, AppBar, Toolbar } from 'material-ui'
import { compose, withState, lifecycle, withHandlers } from 'recompose'
import ImageSearch from 'free-google-image-search'
import React from 'react'
import styled from 'styled-components'

const AppBox = styled.div``

const StyledToolbar = styled(Toolbar)`
	display: flex;
	justify-content: center;
`

const CenterImg = styled.img`
	width: 100%;
	height: 360px;
	object-fit: contain;
`

const CenterBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 40px;
`

const gen = (length, defaultValue) => {
	if (length === 0) return 0
	let randomNumber
	do {
		randomNumber = ~~(Math.random() * length)
	} while (randomNumber === defaultValue)

	return randomNumber
}

const enhance = compose(
	withState('title', 'setTitle', 'Welcome'),
	withState('imgs', 'setImgs', []),
	withState('randomIndex', 'setRandomIndex', -1),
	withHandlers({
		onClick: ({
			imgs,
			setDisabled,
			setTitle,
			randomIndex,
			setRandomIndex,
		}) => () => {
			const genIndex = gen(imgs.length, randomIndex)
			setTitle(genIndex < 20 ? 'You got a polar bear!!' : 'You got a penguin!!')
			setRandomIndex(genIndex)
		},
	}),
	lifecycle({
		componentDidMount() {
			const { setImgs } = this.props
			Promise.all([
				ImageSearch.searchImage('polar bear'),
				ImageSearch.searchImage('penguin'),
			]).then(([polarBears, penguins]) => setImgs([...polarBears, ...penguins]))
		},
	}),
)

const App = ({ randomIndex, imgs, title, onClick }) => {
	return (
		<AppBox>
			<AppBar position="static">
				<StyledToolbar>
					<span>{title}</span>
				</StyledToolbar>
			</AppBar>

			{imgs.length > 0 &&
				randomIndex >= 0 && (
					<CenterImg
						onLoad={() => console.log('done')}
						alt=""
						src={imgs[randomIndex]}
					/>
				)}

			<CenterBox>
				{imgs.length > 0 ? (
					<Button
						type="title"
						variant="raised"
						color="primary"
						onClick={onClick}
					>
						Call Gang
					</Button>
				) : (
					<Button variant="raised" disabled>
						Loading..
					</Button>
				)}
			</CenterBox>
		</AppBox>
	)
}

export default enhance(App)
