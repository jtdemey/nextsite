import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import MainMenuBtns from './MainMenuBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const Header = styled(animated.h1)`
	width: 100%;
	font-family: 'Oleo Script', cursive;
	font-size: 4rem;
`;

const MainMenuView = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	const [spring, api] = useSpring(() => ({ ypos: 60 }));
	React.useEffect(() => api.start({ ypos: 0 }));
  return (
    <View>
      <Header style={{
				color: theme.highlight,
				transform: `${spring.ypos.to(y => `translateY(${y}px)`)}`
			}}>Imposter!</Header>
			<MainMenuBtns />
    </View>
  );
};

MainMenuView.propTypes = {
  active: PropTypes.bool
};

export default MainMenuView;