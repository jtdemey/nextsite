import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import DeathHeader from './DeathHeader';
import { formatTime } from '../SurviveUtils';
import DeathSubheader from './DeathSubheader';
import DeathMenuList from './DeathMenuList';

const View = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DeathView = props => {
	const gameTime = useSelector(state => state.game.gameTime);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={{ display: props.active ? 'block' : 'none', ...spring }}>
			<DeathHeader text={`You perished at ${formatTime(gameTime)}.`} />
			<DeathSubheader />
			<DeathMenuList />
    </View>
  );
};

DeathView.propTypes = {
  active: PropTypes.bool
};

export default DeathView;