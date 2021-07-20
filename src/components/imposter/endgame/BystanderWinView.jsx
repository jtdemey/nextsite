import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	color: #fff;
`;

const Header = styled.h1`
	font-family: 'Oleo Script', cursive;
	font-size: 3rem;
`;

const Text = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.4rem;
`;

const getHeader = isImposter => isImposter ? 'Defeat' : 'Victory!';

const getText = (imposterId, players) => {
	const imposter = players.filter(p => p.socketId === imposterId);
	if(imposter.length < 1) {
		return 'The imposter left the game.';
	}
	return `${imposter[0].name} was the Imposter.`;
};

const BystanderWinView = () => {
	const state = useSelector(state => ({
		imposterId: state.game.imposterId,
		players: state.game.players,
		socketId: state.game.socketId
	}));
	return (
		<View>
			<Header>{getHeader(state.imposterId === state.socketId)}</Header>
			<Text>{getText(state.imposterId, state.players)}</Text>
		</View>
	);
};

export default BystanderWinView;