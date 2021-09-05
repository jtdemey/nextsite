import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GAME_STATES } from './redux/gameConstants';
import GameView from './explore/GameView';
import MainMenuView from './menu/MainMenuView';
import OptionsView from './menu/OptionsView';
import CinematicView from './cinematics/CinematicView';
import CombatView from './combat/CombatView';
import DeathView from './menu/DeathView';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const getView = gameState => {
	switch(gameState) {
		case GAME_STATES.CINEMATIC:
			return <CinematicView active={true} />;
		case GAME_STATES.COMBAT:
			return <CombatView active={true} />;
		case GAME_STATES.DEATH:
			return <DeathView active={true} />;
		case GAME_STATES.EXPLORE:
			return <GameView active={true} />;
		case GAME_STATES.MAINMENU:
			return <MainMenuView active={true} />;
		case GAME_STATES.OPTIONSMENU:
			return <OptionsView active={true} />;
	}
};

const ViewRouter = () => {
  const view = useSelector(state => state.game.gameState);
  return (
    <Container>
			{getView(view)}
    </Container>
  );
};

export default ViewRouter;