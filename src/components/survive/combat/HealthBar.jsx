import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';

const Bar = styled(animated.div)`
  height: 1rem;
  padding: 0.5rem;
`;

const HealthBar = props => {
  const [spring, api] = useSpring(() =>
    getSyrupySpring({ width: '0%', background: '#333333' })
  );
  React.useEffect(() =>
    api.start({ width: `${props.amount}%`, background: '#800000' })
  );
  return <Bar style={spring} />;
};

HealthBar.propTypes = {
  amount: PropTypes.number
};

export default HealthBar;