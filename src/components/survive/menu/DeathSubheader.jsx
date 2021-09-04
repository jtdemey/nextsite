import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Subheader = styled(animated.h2)`
  margin: 0;
  padding: 3rem;
  color: #f5f5f5;
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem;
  opacity: 1;
`;

const DeathSubheader = () => {
  const spring = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 20 },
    config: { delay: 1200, mass: 3, tension: 480, friction: 200 }
  });
  return (
    <Subheader style={spring}>
			Your remains feed the forest and its roots grow deeper still.
    </Subheader>
  );
};

export default DeathSubheader;