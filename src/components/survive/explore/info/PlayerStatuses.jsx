import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPlayerStats } from '../../redux/playerSelectors';
import { getTheme } from '../../ui/themes';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

const StatusArea = styled.div`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 2px 2px 6px #000;
`;

const Amount = styled.p`
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 2rem;
  margin: 0;
  text-align: center;
  text-shadow: 2px 3px 5px rgba(0,0,0,0.5);
`;

const StatusText = styled.p`
  color: #fff;
  font-family: 'Newsreader', serif;
  font-size: 1.1rem;
  margin: 0.25rem;
  text-align: center;
`;

const getStatusText = (stat, amount) => {
  const gt = (min, max, text) => ({ min, max, text });
  const statusTexts = {
    health: [
      gt(0, 0, 'dead'),
      gt(1, 9, 'crippled'),
      gt(10, 24, 'impaired'),
      gt(25, 49, 'wounded'),
      gt(50, 74, 'injured'),
      gt(75, 100, 'healthy')
    ],
    sanity: [
      gt(0, 0, 'irrational'),
      gt(1, 9, 'insane'),
      gt(10, 24, 'delusional'),
      gt(25, 49, 'panicked'),
      gt(50, 74, 'afraid'),
      gt(75, 100, 'sane')
    ],
    energy: [
      gt(0, 0, 'immobile'),
      gt(1, 9, 'exhausted'),
      gt(10, 24, 'fatigued'),
      gt(25, 49, 'tired'),
      gt(50, 74, 'calm'),
      gt(75, 100, 'spry')
    ]
  };
  const statusText = statusTexts[stat].filter(x => amount >= x.min && amount <= x.max)[0];
  return statusText.text;
};

const getAmountColor = stat => {
  switch(stat) {
    case 'health':
      return '#800000';
    case 'sanity':
      return '#602040';
    case 'energy':
      return '#2d5986';
  }
};

const PlayerStatuses = () => {
  const stats = useSelector(state => getPlayerStats(state));
  const theme = getTheme(useSelector(state => state.player.region));
  return (
    <Container>
      {Object.keys(stats).map((stat, i) => (
        <StatusArea key={i} style={{ background: theme.base3, border: `1px solid ${theme.base2}` }}>
          <Amount style={{ color: getAmountColor(stat) }}>{stats[stat]}</Amount>
          <StatusText>{getStatusText(stat, stats[stat])}</StatusText>
        </StatusArea>
      ))}
    </Container>
  );
};

export default PlayerStatuses;
