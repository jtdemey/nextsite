import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getMolassesSpring } from '../ui/springs';

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const Border = styled(animated.div)`
  height: 1px;
  margin: 0.1rem 0rem;
  background: linear-gradient(
		90deg,
    rgba(30, 21, 4, 0.05),
    rgba(30, 21, 4, 0.9),
    rgba(30, 21, 4, 0.05)
  );
`;

const CombatStatBorder = () => {
  const [spring, api] = useSpring(() => getMolassesSpring({ width: '0%' }));
  React.useEffect(() => api.start({ width: '100%' }));
  return (
		<Container>
			<Border style={spring} />
		</Container>
	);
};

export default CombatStatBorder;