import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Indicator = styled.div`
  width: 24px;
  height: 24px;
  margin: 0.25rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Fill = styled(animated.div)`
  position: relative;
  top: 1px;
  left: 1px;
  width: 20px;
  height: 20px;
  padding: 1px;
  border-radius: 50%;
  transform: translateY(12px);
`;

const StatusIndicator = props => {
  const [spring, api] = useSpring(() => ({ background: props.color, yVal: 0 }));
  React.useEffect(() => api.start({ background: props.color, yVal: props.amount }));
  return (
    <Indicator style={{ border: `1px solid ${props.color}` }}>
      <Fill style={{ transform: spring.yVal.to(y => `translateY(${y}px)`), ...spring}} />
    </Indicator>
  );
};

StatusIndicator.propTypes = {
  amount: PropTypes.number,
  color: PropTypes.string
};

export default StatusIndicator;