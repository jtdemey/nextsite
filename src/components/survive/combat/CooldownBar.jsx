import React from 'react';
import PropTypes from 'prop-types';
import CombatBar from './CombatBar';

const CooldownBar = props => {
  return (
    <CombatBar
      amount={props.amount}
      maxAmount={100}
      color="#2d5986"
			isIncremental={false}
      labelText="CD"
			replenishTime={props.amount}
    />
  );
};

CooldownBar.propTypes = {
  amount: PropTypes.number
};

export default CooldownBar;