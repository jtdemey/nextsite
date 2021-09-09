import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CombatStats from './CombatStats';
import EnemySprite from './EnemySprite';
import PlayerSprite from './PlayerSprite';
import { getCurrentEnemy } from '../redux/selectors/combatSelectors';
import { getPlayerCombatStats } from '../redux/selectors/playerSelectors';

const View = styled(animated.div)`
	display: grid;
	grid-template-columns: 2fr 3fr;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(50deg, #bcab9b, #cfc5bf, #bcab9b);
`;

const CombatView = props => {
  const currentEnemy = useSelector(state => getCurrentEnemy(state));
  const playerStats = useSelector(state => getPlayerCombatStats(state));
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() =>
    api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 })
  );
  return (
    <View style={{ display: props.active ? 'grid' : 'none', ...spring }}>
      <CombatStats
        title={currentEnemy.display || '???'}
        health={currentEnemy.health}
        cooldown={currentEnemy.cooldown}
      />
      <EnemySprite />
      <PlayerSprite />
      <CombatStats
        title="Survivor"
        health={playerStats.health}
        cooldown={playerStats.cooldown}
      />
    </View>
  );
};

CombatView.propTypes = {
  active: PropTypes.bool
};

export default CombatView;