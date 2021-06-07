import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StatusIndicator from './StatusIndicator';

const Section = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const StatusIndicators = () => {
  const stats = useSelector(state => ({ hp: state.player.health, sp: state.player.sanity, ep: state.player.energy }));
  return (
    <Section>
      <StatusIndicator color="#800000" />
      <StatusIndicator color="#602040" />
      <StatusIndicator color="#2d5986" />
    </Section>
  );
};

export default StatusIndicators;