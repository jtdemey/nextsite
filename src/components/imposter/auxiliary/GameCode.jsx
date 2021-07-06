import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0.5rem;
	color: #fff;
	text-align: center;
`;

const Title = styled.h6`
	font-size: 1rem;
`;

const Code = styled.h5`
	font-size: 1.5rem;
`;

const GameCode = () => {
	const gameId = useSelector(state => state.game.gameId);
	return (
		<Container>
			<Title>Game Code</Title>
			<Code>{gameId}</Code>
		</Container>
	);
};

export default GameCode;