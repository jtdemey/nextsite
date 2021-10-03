import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toCelsius } from '../SurviveUtils';

const Container = styled.div`
  width: 100%;
  height: 40px;
	display: flex;
  align-items: center;
  font-family: 'DM Serif Display', serif;
  font-size: 1.4rem;
	padding-right: 0.2rem;
	justify-content: center;
	text-align: center;
	margin-right: 0.25rem;
`;

const TemperatureStatus = props => {
	const usingCelsius = useSelector(state => state.game.usingCelsius);
	const temperature = useSelector(state => state.game.environmentTemperature);
	const amount = usingCelsius
		? toCelsius(temperature)
		: temperature;
	const suffix = usingCelsius ? 'C' : 'F';
  return (
    <Container style={{ color: props.color || '#fff' }}>
			{amount}
			<span>&deg;</span>
			{suffix}
    </Container>
  );
};

TemperatureStatus.propTypes = {
	color: PropTypes.string
};

export default TemperatureStatus;