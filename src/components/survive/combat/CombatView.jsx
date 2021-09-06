import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import CombatHeader from './CombatHeader';

const View = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
	background: linear-gradient(50deg, #BCAB9B, #CFC5BF, #BCAB9B);
`;

const CombatView = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={{ display: props.active ? 'block' : 'none', ...spring }}>
			<CombatHeader />
    </View>
  );
};

CombatView.propTypes = {
  active: PropTypes.bool
};

export default CombatView;