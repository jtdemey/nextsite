import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../auxiliary/PlayerList';
import GameCode from '../auxiliary/GameCode';
import GameTimer from '../auxiliary/GameTimer';
import ImposterPrompt from './ImposterPrompt';
import NotificationArea from '../auxiliary/NotificationArea';
import ScenarioPrompt from './ScenarioPrompt';
import VoteArea from './VoteArea';
import GameBtns from './GameBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const GameInfoArea = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const ImposterGameView = () => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
    imposterId: state.game.imposterId,
    socketId: state.game.socketId,
    players: state.game.players,
    isAccusing: state.game.isAccusing
	}));
	const isImposter = state.socketId === state.imposterId;
	return (
		<View>
			<PlayerList players={state.players} />
			<GameInfoArea>
				<GameCode	/>
				<GameTimer title="Time left:" />
			</GameInfoArea>
			<VoteArea />
			<NotificationArea />
			{isImposter
				? <ImposterPrompt />
				: <ScenarioPrompt socketId={state.socketId} />}
			<GameBtns
				gameId={state.gameId}
				isAccusing={state.isAccusing}
				isImposter={isImposter}
				socketId={state.socketId}
			/>
		</View>
	);
};

export default ImposterGameView;