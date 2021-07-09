import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Container = styled.div`
	width: 9rem;
	margin: 2rem auto 0;
	padding: 0.25rem;
	border-radius: 1rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	text-align: center;
`;

const Title = styled.h6`
	font-size: 1rem;
	margin: 0.25rem;
`;

const Code = styled.h5`
	font-size: 1.75rem;
	margin: 0.25rem;
`;

const GameCode = () => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
		theme: state.game.theme,
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ background: theme.secondary }}>
			<Title>Game Code</Title>
			<Code>{state.gameId}</Code>
		</Container>
	);
};

export default GameCode;