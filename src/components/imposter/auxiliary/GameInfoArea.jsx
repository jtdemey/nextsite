import React from 'react';
import styled from 'styled-components';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 1rem;
`;

const GameInfoArea = () => {
	return (
		<Container>
			<GameCode	/>
			<GameTimer title="Time left:" />
		</Container>
	);
};

export default GameInfoArea;