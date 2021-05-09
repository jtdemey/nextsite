import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import GamePanel from './middle/GamePanel';
// import ButtonBar from './bottom/ButtonBar';
import { delay } from './SurviveUtils';
import { gameTick, GAME_STATES } from './redux/gameSlice';
import GameView from './explore/GameView';
import MainMenuView from './menu/MainMenuView';

/*
$black-bean: #460c0cff;
$up-maroon: #7d0013ff;
$bittersweet-shimmer: #b4575cff;
$deep-taupe: #81676bff;
$dim-gray: #706c6fff;
$black-coffee: #443c41ff;
*/

const App = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #151313;
`;

const SurviveApp = () => {
  const view = useSelector(state => state.game.gameState);
  const dispatch = useDispatch();
  React.useEffect(() => setInterval(() => {
    dispatch(gameTick());
  }, 500), []);
  return (
    <App>
      <MainMenuView active={view === GAME_STATES.MAINMENU} />
      <GameView active={view === GAME_STATES.EXPLORE} />
    </App>
  );
};

export default SurviveApp;