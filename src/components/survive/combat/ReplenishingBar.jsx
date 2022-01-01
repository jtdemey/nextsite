import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem;
  border-radius: 1rem 0 0 0.5rem;
  border-right: 1px solid #130f04;
`;

const getSpringConfig = props => ({
  from: { background: '#333333', width: '100%' },
  to: { background: props.color, width: '100%' },
  config: {
    duration: props.replenishTime * 500
  }
});

const ReplenishingBar = props => {
  const [spring, api] = useSpring(() => getSpringConfig(props));
  React.useEffect(() => {
    if (props.replenishTime < 1) {
      return;
    }
    api.start(getSpringConfig(props));
  }, [props.replenishTime]);
  return <Bar style={spring} />;
};

ReplenishingBar.propTypes = {
  color: PropTypes.string,
  replenishTime: PropTypes.number
};

export default ReplenishingBar;