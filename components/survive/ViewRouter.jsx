import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GAME_STATES } from './redux/gameConstants';
import GameView from './explore/GameView';
import MainMenuView from './menu/MainMenuView';
import OptionsView from './menu/OptionsView';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ViewRouter = () => {
  const view = useSelector(state => state.game.gameState);
  return (
    <Container>
      <MainMenuView active={view === GAME_STATES.MAINMENU} />
      <GameView active={view === GAME_STATES.EXPLORE} />
      <OptionsView active={view === GAME_STATES.OPTIONSMENU} />
    </Container>
  );
};

export default ViewRouter;