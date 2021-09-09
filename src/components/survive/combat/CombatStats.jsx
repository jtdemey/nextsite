import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';
import CombatHeader from './CombatHeader';
import CooldownBar from './CooldownBar';
import HealthBar from './HealthBar';

const Container = styled.article`
	position: relative;
	width: 100%;
	height: 100%;
`;

const Block = styled(animated.section)`
	position: absolute;
	top: 2rem;
	left: 0rem;
	padding: 1rem;
	border-top: 1px solid #111;
	border-bottom: 1px solid #111;
`;

const CombatStats = props => {
  const [spring, api] = useSpring(() =>
    getSyrupySpring({ opacity: 0, y: -10 })
  );
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
	return (
		<Container>
			<Block style={spring}>
				<CombatHeader text={props.title} />
				<HealthBar amount={props.health} />
				<CooldownBar amount={props.cooldown} />
			</Block>
		</Container>
	);
};

CombatStats.propTypes = {
  title: PropTypes.string,
  health: PropTypes.number,
  cooldown: PropTypes.number
};

export default CombatStats;