import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../../ui/themes';

const Container = styled.div`
  max-width: 100%;
	display: grid;
	grid-template-columns: 3fr 3fr 1fr;
	align-items: center;
	margin: 0 0.5rem;
`;

const Label = styled.span`
	color: #fff;
  font-family: 'DM Serif Display', serif;
  font-size: 1rem;
	margin: 0.1rem 0;
	padding: 0 0.5rem;
	white-space: nowrap;
`;

const TemperatureBar = styled.div`
	height: 1rem;
`;

const Amount = styled.span`
	color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.4rem;
	margin: 0 0.5rem 0 auto;
`;

const COLD_BLUE = 'hsl(220, 44%, 55%)';
const WARM_ORANGE = 'hsl(40, 73%, 49%)';

const BodyTemperatureStatus = () => {
	const playerTemperature = useSelector(state => state.player.temperature);
	const theme = getTheme(useSelector(state => state.player.region));
  return (
    <Container style={{ background: theme.base3 }}>
			<Label>Body Temperature </Label>
			<TemperatureBar style={{
				backgroundImage: `linear-gradient(to right, ${COLD_BLUE}, ${WARM_ORANGE})`,
				width: `${playerTemperature > 100 ? 100 : playerTemperature}%`
			}} />
			<Amount style={{
				color: playerTemperature > 49 ? WARM_ORANGE : COLD_BLUE
			}}>{playerTemperature.toString()}</Amount>
    </Container>
  );
};

export default BodyTemperatureStatus;