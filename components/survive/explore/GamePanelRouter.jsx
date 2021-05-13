import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GAME_PANEL_VIEWS } from '../redux/gameConstants';
import ConsoleView from './console/ConsoleView';
import InventoryView from './inventory/InventoryView';
import MapView from './map/MapView';
import InfoView from './info/InfoView';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const GamePanelRouter = () => {
  const view = useSelector(state => state.game.gamePanelView);
  return (
    <Container>
      <ConsoleView active={view === GAME_PANEL_VIEWS.CONSOLE} />
      <InventoryView active={view === GAME_PANEL_VIEWS.INVENTORY} />
      <MapView active={view === GAME_PANEL_VIEWS.MAP} />
      <InfoView active={view === GAME_PANEL_VIEWS.INFO} />
    </Container>
  );
};

export default GamePanelRouter;