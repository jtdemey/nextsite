import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getSyrupySpring } from '../ui/springs';
import CombatHeader from './CombatHeader';
import CooldownBar from './CooldownBar';
import HealthBar from './HealthBar';
import CombatStatBorder from './CombatStatBorder';

const Container = styled.article`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Block = styled(animated.section)`
  position: absolute;
  top: 3rem;
  width: 80%;
	z-index: 1;
`;

const CombatStats = props => {
  const alignmentStyle = props.alignRight
    ? { right: '1rem' }
    : { left: '1rem' };
  const [spring, api] = useSpring(() =>
    getSyrupySpring({ opacity: 0, y: -10 })
  );
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Container>
      <Block
        style={{
          ...alignmentStyle,
          ...spring
        }}
      >
        <CombatStatBorder />
        <CombatHeader text={props.title} />
        <HealthBar amount={props.health} maxAmount={props.maxHealth} />
        <CooldownBar amount={props.cooldown} />
        <CombatStatBorder />
      </Block>
    </Container>
  );
};

CombatStats.propTypes = {
  alignRight: PropTypes.bool,
  title: PropTypes.string,
  health: PropTypes.number,
  maxHealth: PropTypes.number,
  cooldown: PropTypes.number
};

export default CombatStats;