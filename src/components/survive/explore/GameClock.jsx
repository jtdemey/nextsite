import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatTime } from '../SurviveUtils';

const Clock = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Time = styled.span`
  padding-left: 1rem;
  color: #f5f5f5;
  font-family: 'DM Serif Display', serif;
  font-size: 1.1rem;
`;

const GameClock = () => {
  const gameTime = useSelector(state => state.game.gameTime);
  return (
    <Clock>
      <Time>
        {formatTime(gameTime)}
      </Time>
    </Clock>
  );
};

export default GameClock;
