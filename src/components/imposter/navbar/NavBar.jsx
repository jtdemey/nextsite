import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getButterySpring, getTheme } from '../ImposterUtils';

const Bar = styled(animated.div)`
	height: 100%;
`;

const NavBar = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, api] = useSpring(() => getButterySpring({ yScale: 0.5 }));
	React.useEffect(() => api.start({
		yScale: props.visible ? 1.0 : 0.0
	}), [props.visible]);
	return (
		<Bar style={{
			background: theme.secondary,
			display: props.visible ? 'block' : 'none',
			transform: spring.yScale.to(y => `scaleY(${y})`)
		}}>
			<div></div>
		</Bar>
	);
};

NavBar.propTypes = {
	visible: PropTypes.bool
};

export default NavBar;