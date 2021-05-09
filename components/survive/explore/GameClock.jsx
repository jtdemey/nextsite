import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const formatTime = (gt, includeWeekday = false) => {
  const s = gt.split(' ');
  const d = s[0] === 'Sat' ? `${s[0]}urday ` : `${s[0]}day `;
  const pa = s[0] === 'Sat' ? 'PM' : 'AM';
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return includeWeekday ? d + t : `${t} ${pa}`;
};

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