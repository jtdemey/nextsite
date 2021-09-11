import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getIcySpring } from '../ui/springs';

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 0rem 0.25rem;
`;

const Label = styled.span`
	padding-right: 0.1rem;
	color: #130F04;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
`;

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem;
	border-radius: 1rem 0 0 0.5rem;
`;

const CombatBar = props => {
	const barWidth = props.amount / props.maxAmount * 100;
  const [spring, api] = useSpring(() =>
    getIcySpring({ width: '0%', background: '#333333' })
  );
  React.useEffect(() =>
    api.start({ width: `${barWidth}%`, background: props.color })
  );
  return (
		<Container>
			<Label>{props.labelText}</Label>
			<Bar style={spring} />
		</Container>
	);
};

CombatBar.propTypes = {
  amount: PropTypes.number,
	maxAmount: PropTypes.number,
	color: PropTypes.string,
	labelText: PropTypes.string
};

export default CombatBar;