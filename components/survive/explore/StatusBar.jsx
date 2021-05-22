import React from 'react';
import styled from 'styled-components';
import GameClock from './GameClock';
import OptionsGear from './OptionsGear';

const Bar = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1.5fr 2fr 0.5fr;
  background-color: #151415;
  border-bottom: 1px solid #333333;
`;

const StatusBar = () => (
  <Bar>
    <GameClock />
    <div></div>
    <OptionsGear />
  </Bar>
);

export default StatusBar;