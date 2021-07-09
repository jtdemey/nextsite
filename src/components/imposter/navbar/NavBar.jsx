import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring, useSprings } from '@react-spring/web';
import styled from 'styled-components';
import { getButterySpring, getTheme } from '../ImposterUtils';

const Bar = styled(animated.div)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	height: 100%;
`;

const Item = styled(animated.div)`
	color: #fff;
	display: flex;
	padding: 0.25rem;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	justify-content: center;
	align-items: center;
`;

const NavBar = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, barApi] = useSpring(() => getButterySpring({ yScale: 0.5 }));
	React.useEffect(() => {
		barApi.start({ yScale: props.visible ? 1.0 : 0.0 });
	}, [props.visible]);
	return (
		<Bar style={{
			background: theme.secondary,
			display: props.visible ? 'grid' : 'none',
			transform: spring.yScale.to(y => `scaleY(${y})`)
		}}>
			<Item>Home</Item>
			<Item>Settings</Item>
			<Item>Quit</Item>
		</Bar>
	);
};

NavBar.propTypes = {
	visible: PropTypes.bool
};

export default NavBar;