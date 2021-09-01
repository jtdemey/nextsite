import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GameClock from './GameClock';
import OptionsGear from './OptionsGear';
import StatusIndicators from './StatusIndicators';
import { getTheme } from '../ui/themes';
import TemperatureStatus from './TemperatureStatus';

const Bar = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
	color: #fff;
  grid-template-columns: 3fr 0.75fr 1.5fr 0.5fr;;
  border-bottom: 1px solid #333333;
`;

const StatusBar = () => {
  const theme = getTheme(useSelector(state => state.player.region));
  return (
    <Bar style={{ background: theme.base2 }}>
      <GameClock />
			<TemperatureStatus color={theme.highlight} />
      <StatusIndicators />
      <OptionsGear />
    </Bar>
  );
};

export default StatusBar;