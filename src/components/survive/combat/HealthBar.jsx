import React from 'react';
import PropTypes from 'prop-types';
import CombatBar from './CombatBar';

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