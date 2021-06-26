import React from 'react';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import NavBar from '../navbar/NavBar';

const Header = styled(animated.h1)`
	width: 100%;
	font-family: 'Oleo Script', cursive;
	font-size: 4rem;
	text-align: center;
`;

const ImposterHeader = () => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, api] = useSpring(() => ({ ypos: 60 }));
	React.useEffect(() => api.start({ ypos: 0 }));
	return (
		<>
			<Header style={{
				color: theme.highlight,
				transform: spring.ypos.to(y => `translateY(${y}px)`)
			}}>Imposter!</Header>
			<NavBar />
		</>
	);
};

export default ImposterHeader;