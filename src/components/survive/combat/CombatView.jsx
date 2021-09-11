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
import CombatConsole from './CombatConsole';
import CombatInput from './CombatInput';

const View = styled(animated.div)`
  width: 100%;
  height: 100%;
	background: linear-gradient(50deg, #D4C09F, #E2DAC5, #D4C09F);
`;

const SpriteArea = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
  position: absolute;
  top: 0;
  left: 0;
`;

const CombatView = props => {
  const currentEnemy = useSelector(state => getCurrentEnemy(state));
  const playerStats = useSelector(state => getPlayerCombatStats(state));
	const inputRef = React.useRef(null);
	React.useEffect(() => {
		if(props.active) {
			inputRef.current.focus();
		}
	}, [props.active]);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() =>
    api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 })
  );
  return (
    <View style={{ display: props.active ? 'grid' : 'none', ...spring }}>
			<SpriteArea>
				<CombatStats
					title={currentEnemy.display || '???'}
					health={currentEnemy.health}
					maxHealth={currentEnemy.maxHealth}
					cooldown={currentEnemy.cooldown}
				/>
				<EnemySprite />
				<PlayerSprite />
				<CombatStats
					alignRight={true}
					title="Survivor"
					health={playerStats.health}
					maxHealth={playerStats.maxHealth}
					cooldown={playerStats.cooldown}
				/>
			</SpriteArea>
			<CombatConsole />
			<CombatInput inputRef={inputRef} />
    </View>
  );
};

CombatView.propTypes = {
  active: PropTypes.bool
};

export default CombatView;