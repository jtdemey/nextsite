import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.article`
	padding: 1rem;
`;

const Line = styled(animated.pre)`
  min-height: 26px;
  margin: 0;
  padding: 0.1rem 0.5rem 0;
  font-family: 'Newsreader', serif;
  font-size: 1rem;
	line-height: 1.25rem;
	white-space: inherit;
`;

const CombatConsole = () => {
	const consoleLines = useSelector(state => state.combat.combatText);
  return (
		<Container>
			{consoleLines.map(line => (
				<Line key={line.index}>{line.text}</Line>
			))}
		</Container>
	);
};

export default CombatConsole;