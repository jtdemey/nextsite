import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.4rem;
`;

const Header = styled.h1`
`;

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
		theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	return (
		<View>
			<Header>Actors win!</Header>
			{getText(state.imposterId, state.players)}
		</View>
	);
};

export default BystanderWinView;