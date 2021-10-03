import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IncrementalBar from './IncrementalBar';
import ReplenishingBar from './ReplenishingBar';

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

const BarHolder = styled.div`
  width: 100%;
`;

const CombatBar = props => {
  return (
    <Container>
      <Label>{props.labelText}</Label>
      <BarHolder>
        {props.isIncremental ? (
          <IncrementalBar
            amount={props.amount}
            maxAmount={props.maxAmount}
            color={props.color}
          />
        ) : (
          <ReplenishingBar color={props.color} replenishTime={props.amount} />
        )}
      </BarHolder>
    </Container>
  );
};

CombatBar.propTypes = {
  amount: PropTypes.number,
  maxAmount: PropTypes.number,
  color: PropTypes.string,
  isIncremental: PropTypes.bool,
  labelText: PropTypes.string
};

export default CombatBar;