import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Indicator = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0.25rem;
  border-radius: 50%;
`;

const Fill = styled(animated.div)`
  width: 0.98rem;
  height: 0.98rem;
  padding: 2px;
  border-radius: 50%;
`;

const StatusIndicator = props => {
  const [spring, api] = useSpring(() => ({ background: props.color, border: `1px solid ${props.color}` }));
  React.useEffect(() => api.start({ background: props.color }));
  return (
    <Indicator style={{ border: `1px solid ${props.color}` }}>
      <Fill style={spring} />
    </Indicator>
  );
};

StatusIndicator.propTypes = {
  amount: PropTypes.number,
  color: PropTypes.string
};

export default StatusIndicator;