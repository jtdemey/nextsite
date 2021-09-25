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

const BarHolder = styled.div`
	width: 100%;
`;

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem;
	border-radius: 1rem 0 0 0.5rem;
	border-right: 1px solid #130F04;
`;

const CombatBar = props => {
  const [spring, api] = useSpring(() =>
    getIcySpring({ width: '0%', background: '#333333' })
  );
  React.useEffect(() => {
		if(props.replenishTime && props.replenishTime > 0) {
			api.start({ width: '100%', background: props.color, duration: props.replenishTime });a
			return;
		}
		const barWidth = props.amount / props.maxAmount * 100;
    api.start({ width: `${barWidth}%`, background: props.color });
	}, [props.amount]);
  return (
		<Container>
			<Label>{props.labelText}</Label>
			<BarHolder>
				<Bar style={spring} />
			</BarHolder>
		</Container>
	);
};

CombatBar.propTypes = {
  amount: PropTypes.number,
	maxAmount: PropTypes.number,
	color: PropTypes.string,
	labelText: PropTypes.string,
	replenishTime: PropTypes.number
};

export default CombatBar;