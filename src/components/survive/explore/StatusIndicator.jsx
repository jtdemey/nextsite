import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getRunnySpring } from '../ui/springs';

const Indicator = styled.div`
  width: 24px;
  height: 24px;
  margin: 0.25rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Fill = styled(animated.div)`
  height: 100%;
  margin: 0px;
`;

const getRadialGradient = colors => `radial-gradient(${colors[1]}, ${colors[0]})`;

const StatusIndicator = props => {
  const [spring, api] = useSpring(() =>
    getRunnySpring({ background: getRadialGradient(props.colors), h: 0 })
  );
  React.useEffect(() =>
    api.start({ background: getRadialGradient(props.colors), h: props.amount })
  );
  return (
    <Indicator style={{ border: `1px solid ${props.colors[1]}` }}>
      <Fill
        style={{
          background: spring.background,
          transform: spring.h.to(y => `translateY(${100 - y}%)`)
        }}
      />
    </Indicator>
  );
};

StatusIndicator.propTypes = {
  amount: PropTypes.number,
  colors: PropTypes.array
};

export default StatusIndicator;