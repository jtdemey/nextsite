import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../auxiliary/PlayerList';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import NotificationArea from '../auxiliary/NotificationArea';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const LobbyView = () => {
	const players = useSelector(state => state.game.players);
	return (
		<View>
			<PlayerList players={players} />
			<GameCode	/>
			<GameTimer title="Starting in:" />
			<NotificationArea />
		</View>
	);
};

export default LobbyView;