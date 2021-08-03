import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GameClock from './GameClock';
import OptionsGear from './OptionsGear';
import StatusIndicators from './StatusIndicators';
import { getTheme } from '../ui/themes';

const Bar = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1.5fr 2fr 0.5fr;
  border-bottom: 1px solid #333333;
`;

const StatusBar = () => {
  const theme = getTheme(useSelector(state => state.player.region));
  return (
    <Bar style={{ background: theme.base2 }}>
      <GameClock />
      <StatusIndicators />
      <OptionsGear />
    </Bar>
  );
};

export default StatusBar;
