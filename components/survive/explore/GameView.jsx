import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import GamePanel from './GamePanel';

const View = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const GameView = props => {
  const spring = useSpring({ display: props.active ? 'block' : 'none', opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 });
  return (
    <View style={spring}>
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