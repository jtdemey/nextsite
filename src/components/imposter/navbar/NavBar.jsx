import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Bar = styled(animated.div)``;

const NavBar = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, api] = useSpring(() => ({}));
	React.useEffect(() => api.start({ ypos: 0 }));
	return (
		<Bar style={{
			background: theme.secondary,
			display: props.visible ? 'block' : 'none',
			...spring
		}}>
			<div></div>
		</Bar>
	);
};

NavBar.propTypes = {
	visible: PropTypes.bool
};

export default NavBar;