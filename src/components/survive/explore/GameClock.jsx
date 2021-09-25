import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { formatTime } from '../SurviveUtils';
import { getSyrupySpring } from '../ui/springs';

const Clock = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Time = styled(animated.span)`
  padding-left: 1rem;
  font-family: 'DM Serif Display', serif;
  font-size: 1.1rem;
`;

const GameClock = props => {
  const gameTime = useSelector(state => state.game.gameTime);
  const [spring, api] = useSpring(() => getSyrupySpring({ color: '#f5f5f5' }));
  React.useEffect(() =>
    api.start({ color: props.isDark ? '#130F04' : '#f5f5f5' })
  );
  return (
    <Clock>
      <Time style={spring}>
        {formatTime(gameTime)}
      </Time>
    </Clock>
  );
};

GameClock.propTypes = {
  isDark: PropTypes.bool
};

export default GameClock;