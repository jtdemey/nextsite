import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPlayerStats } from '../redux/selectors/playerSelectors';
import StatusIndicator from './StatusIndicator';

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const StatusIndicators = () => {
  const stats = useSelector(state => ({
		ep: state.player.energy,
		sp: state.player.sanity,
		hp: state.player.health
	}));
  return (
    <Section>
      <StatusIndicator amount={stats.ep} colors={['#19334d', '#2d5986']} />
      <StatusIndicator amount={stats.sp} colors={['#391326', '#602040']} />
      <StatusIndicator amount={stats.hp} colors={['#330000', '#800000']} />
    </Section>
  );
};

export default StatusIndicators;