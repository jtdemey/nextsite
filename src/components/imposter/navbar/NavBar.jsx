import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import NavItem from './NavItem';
import { getButterySpring, getTheme } from '../ImposterUtils';
import { showModal } from '../redux/imposterSlice';
import { MODAL_VIEWS } from '../redux/imposterConstants';

const Bar = styled(animated.div)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	height: 100%;
`;

const NavBar = props => {
	const dispatch = useDispatch();
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, api] = useSpring(() => getButterySpring({ yScale: 0.5 }));
	React.useEffect(() => api.start({ yScale: props.visible ? 1.0 : 0.0 }));
	return (
		<Bar style={{
			background: theme.secondary,
			display: props.visible ? 'grid' : 'none',
			transform: spring.yScale.to(y => `scaleY(${y})`)
		}}>
			<NavItem
				clickFunc={() => dispatch(showModal(MODAL_VIEWS.RULES))}
				text="Rules"
				visible={props.visible}
			/>
			<NavItem
				clickFunc={() => dispatch(showModal(MODAL_VIEWS.SETTINGS))}
				delay={250}
				text="Settings"
				visible={props.visible}
			/>
			<NavItem
				clickFunc={() => false}
				delay={500}
				text="Quit"
				visible={props.visible}
			/>
		</Bar>
	);
};

NavBar.propTypes = {
	visible: PropTypes.bool
};

export default NavBar;