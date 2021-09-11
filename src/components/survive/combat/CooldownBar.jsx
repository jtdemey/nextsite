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
	color: #130F04;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
`;

const Bar = styled(animated.div)`
  height: 0.75rem;
  margin: 0.25rem 0rem 0.35rem;
	border-radius: 1rem 0 0 0.5rem;
`;

const CooldownBar = props => {
  return (
    <CombatBar
      amount={100 - props.amount}
      maxAmount={100}
      color="#2d5986"
      labelText="CD"
    />
  );
};

CooldownBar.propTypes = {
  amount: PropTypes.number
};

export default CooldownBar;