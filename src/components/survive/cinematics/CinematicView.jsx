import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import IntroCinematic from './IntroCinematic';
import { CINEMATICS } from '../redux/gameConstants';

const View = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CinematicView = props => {
  const cinematicId = useSelector(state => state.game.cinematicId);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={{ display: props.active ? 'block' : 'none', ...spring }}>
      <IntroCinematic active={cinematicId === CINEMATICS.INTRO} />
    </View>
  );
};

CinematicView.propTypes = {
  active: PropTypes.bool
};

export default CinematicView;
