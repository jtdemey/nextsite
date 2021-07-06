import React from 'react';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring, getTheme } from '../ImposterUtils';
import NavBar from '../navbar/NavBar';

const Container = styled(animated.div)`
	display: grid;
	grid-template-rows: 3fr 1fr;
`;

const Header = styled(animated.h1)`
	width: 100%;
	font-family: 'Oleo Script', cursive;
	font-size: 4rem;
	text-align: center;
`;

const ImposterHeader = () => {
	const state = useSelector(state => ({
		theme: state.game.theme,
		view: state.game.view
	}));
	const showNav = state.view > 2;
	const theme = getTheme(state.theme);
	const [spring, api] = useSpring(() => getSyrupySpring({
		opacity: 0,
		yScale: 0.5
	}));
	React.useEffect(() => api.start({
		opacity: 1,
		yScale: 1
	}));
	return (
		<Container>
			<Header style={{
				color: theme.highlight,
				transform: spring.yScale.to(y => `scaleY(${y})`),
				...spring
			}}>Imposter!</Header>
			<NavBar visible={showNav} />
		</Container>
	);
};

export default ImposterHeader;