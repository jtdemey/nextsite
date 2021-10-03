import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getIcySpring } from '../ui/springs';

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem;
  border-radius: 1rem 0 0 0.5rem;
  border-right: 1px solid #130f04;
`;

const IncrementalBar = props => {
  const [spring, api] = useSpring(() =>
    getIcySpring({ width: '0%', background: '#333333' })
  );
  React.useEffect(() => {
		const barWidth = (props.amount / props.maxAmount) * 100;
		api.start({ width: `${barWidth}%`, background: props.color });
  }, [props.amount]);
  return (
    <Bar style={spring} />
  );
};

IncrementalBar.propTypes = {
  amount: PropTypes.number,
  maxAmount: PropTypes.number,
  color: PropTypes.string
};

export default IncrementalBar;