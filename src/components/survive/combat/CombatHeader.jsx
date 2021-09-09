import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';

const Header = styled(animated.h2)`
	color: #111;
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem;
	margin: 0.25rem 0;
	text-align: center;
`;

const CombatHeader = props => {
  const [spring, api] = useSpring(() => getSyrupySpring({ opacity: 0, y: -10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Header style={spring}>
			{props.text}
    </Header>
  );
};

CombatHeader.propTypes = {
	text: PropTypes.string
};

export default CombatHeader;