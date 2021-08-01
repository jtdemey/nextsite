import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StatusIndicator from './StatusIndicator';

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const StatusIndicators = () => {
  const stats = useSelector(state => ({ hp: state.player.health, sp: state.player.sanity, ep: state.player.energy }));
  return (
    <Section>
      <StatusIndicator amount={stats.ep} color="#2d5986" />
      <StatusIndicator amount={stats.sp} color="#602040" />
      <StatusIndicator amount={stats.hp} color="#800000" />
    </Section>
  );
};

export default StatusIndicators;