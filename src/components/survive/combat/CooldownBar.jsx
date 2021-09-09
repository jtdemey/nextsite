import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';

const Bar = styled(animated.div)`
  height: 1rem;
  padding: 0.5rem;
`;

const CooldownBar = props => {
  const [spring, api] = useSpring(() =>
    getSyrupySpring({ width: '0%', background: '#333333' })
  );
  React.useEffect(() =>
    api.start({ width: `${100 - props.amount}%`, background: '#2d5986' })
  );
  return <Bar style={spring} />;
};

CooldownBar.propTypes = {
  amount: PropTypes.number
};

export default CooldownBar;