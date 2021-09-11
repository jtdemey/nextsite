import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getIcySpring, getSyrupySpring } from '../ui/springs';

const Header = styled(animated.h2)`
	color: #130F04;
  font-family: 'DM Serif Display', serif;
  font-size: 1.1rem;
	margin: 0rem;
	text-align: center;
`;

const CombatHeader = props => {
  const [spring, api] = useSpring(() => getIcySpring({ opacity: 0, y: -10 }));
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