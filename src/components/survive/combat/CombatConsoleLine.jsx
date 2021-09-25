import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getMolassesSpring } from '../ui/springs';

const Line = styled(animated.pre)`
  min-height: 26px;
  margin: 0;
  padding: 0.1rem 0.5rem 0;
  font-family: 'Newsreader', serif;
  font-size: 1rem;
	line-height: 1.25rem;
	white-space: inherit;
`;

const CombatConsoleLine = props => {
  const [spring, api] = useSpring(() =>
    getMolassesSpring({ opacity: 1 })
  );
  React.useEffect(() =>
    api.start({ opacity: 1 })
  );
  return <Line style={spring}>{props.text}</Line>;
};

CombatConsoleLine.propTypes = {
	currentIndex: PropTypes.number,
	lineIndex: PropTypes.number,
	text: PropTypes.string
};

export default CombatConsoleLine;