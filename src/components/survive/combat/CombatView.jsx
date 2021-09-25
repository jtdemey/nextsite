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
import GameClock from '../explore/GameClock';

const View = styled(animated.div)`
  width: 100%;
  height: 100%;
  background: linear-gradient(50deg, #d4c09f, #e2dac5, #d4c09f);
`;

const ShadowBorder = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: inset 1rem 1rem 1rem rgba(3, 3, 3, 0.2),
    inset -1rem -1rem 1rem rgba(3, 3, 3, 0.2);
`;

const SpriteArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CombatView = props => {
  const currentEnemy = useSelector(state => getCurrentEnemy(state));
  const playerStats = useSelector(state => getPlayerCombatStats(state));
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (props.active) {
      inputRef.current.focus();
    }
  }, [props.active]);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() =>
    api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 })
  );
  return (
    <View style={{ display: props.active ? 'grid' : 'none', ...spring }}>
      <ShadowBorder>
        <GameClock isDark={true} />
				<SpriteArea>
					<CombatStats
						title={currentEnemy.display || '???'}
						health={currentEnemy.health}
						maxHealth={currentEnemy.maxHealth}
						cooldown={currentEnemy.cooldown}
					/>
					<EnemySprite
						imgSrc={`survive/creatures/${currentEnemy.name}.webp`}
					/>
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
      </ShadowBorder>
    </View>
  );
};

CombatView.propTypes = {
  active: PropTypes.bool
};

export default CombatView;