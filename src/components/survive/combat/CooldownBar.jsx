import React from 'react';
import PropTypes from 'prop-types';
import CombatBar from './CombatBar';

const CooldownBar = props => {
  return (
    <CombatBar
      amount={100 - props.amount}
      maxAmount={100}
      color="#2d5986"
      labelText="CD"
			replenishTime={props.amount}
    />
  );
};

CooldownBar.propTypes = {
  amount: PropTypes.number
};

export default CooldownBar;