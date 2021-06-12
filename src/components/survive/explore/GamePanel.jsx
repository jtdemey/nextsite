import React from 'react';
import styled from 'styled-components';
import GamePanelRouter from './GamePanelRouter';

const Panel = styled.div`
  width: 100%;
  height: calc(100% - 100px);
`;

const GamePanel = () => (
  <Panel>
    <GamePanelRouter />
  </Panel>
);

export default GamePanel;