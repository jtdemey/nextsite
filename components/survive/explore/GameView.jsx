import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import GamePanel from './GamePanel';

const View = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const GameView = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 20 }));
  api.start(() => props.active ? ({ opacity: 1, y: 0 }) : ({ opacity: 0, y: 20 }));
  return (
    <View style={{
      opacity: spring.opacity,
      transform: spring.y.to(y => `translateY(${y}px)`)
    }}>
      <StatusBar />
      <GamePanel />
      <ButtonBar />
    </View>
  );
};

GameView.propTypes = {
  active: PropTypes.bool
};

export default GameView;