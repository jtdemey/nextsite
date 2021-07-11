import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../auxiliary/PlayerList';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import NotificationArea from '../auxiliary/NotificationArea';
import LobbyBtns from './LobbyBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	overflow-y: scroll;
`;

const GameInfoArea = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const LobbyView = () => {
	const players = useSelector(state => state.game.players);
	return (
		<View>
			<PlayerList players={players} />
			<GameInfoArea>
				<GameCode	/>
				<GameTimer title="Starting in:" />
			</GameInfoArea>
			<NotificationArea />
			<LobbyBtns />
		</View>
	);
};

export default LobbyView;