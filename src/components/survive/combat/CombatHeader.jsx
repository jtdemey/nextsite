import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';

const Header = styled(animated.h2)`
	color: #111;
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem;
	text-align: center;
`;

const CombatHeader = () => {
  const [spring, api] = useSpring(() => getSyrupySpring({ opacity: 0, y: -10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Header style={spring}>
			- Enemigos -
    </Header>
  );
};

export default CombatHeader;