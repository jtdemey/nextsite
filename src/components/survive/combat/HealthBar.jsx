import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getIcySpring } from '../ui/springs';
import CombatBar from './CombatBar';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 0.25rem;
`;

const Label = styled.span`
  padding-right: 0.1rem;
  color: #130f04;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
`;

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem;
  border-radius: 1rem 0 0 0.5rem;
`;

const HealthBar = props => {
  return (
    <CombatBar
      amount={props.amount}
      maxAmount={props.maxAmount}
      color="#800000"
      labelText="HP"
    />
  );
};

HealthBar.propTypes = {
  amount: PropTypes.number,
  maxAmount: PropTypes.number
};

export default HealthBar;