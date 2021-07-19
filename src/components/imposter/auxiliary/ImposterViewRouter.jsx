import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BystanderWinView from '../endgame/BystanderWinView';
import ImposterGameView from '../ingame/ImposterGameView';
import LobbyView from '../lobby/LobbyView';
import HostGameForm from '../mainmenu/HostGameForm';
import JoinGameForm from '../mainmenu/JoinGameForm';
import MainMenuView from '../mainmenu/MainMenuView';
import { IMPOSTER_VIEWS } from '../redux/imposterConstants';
import LoadingView from './LoadingView';

const Container = styled.div`
	width: 100%;
`;

const getView = viewIndex => {
	switch(viewIndex) {
		case IMPOSTER_VIEWS.MAIN_MENU:
			return <MainMenuView />;
		case IMPOSTER_VIEWS.HOST_GAME_FORM:
			return <HostGameForm />;
		case IMPOSTER_VIEWS.JOIN_GAME_FORM:
			return <JoinGameForm />;
		case IMPOSTER_VIEWS.LOBBY:
			return <LobbyView />;
		case IMPOSTER_VIEWS.IN_GAME:
			return <ImposterGameView />;
		case IMPOSTER_VIEWS.BYSTANDER_VICTORY:
			return <BystanderWinView />;
		case IMPOSTER_VIEWS.LOADING:
			return <LoadingView />;
		default:
			return <div></div>;
	}
};

const ImposterViewContainer = () => {
	const view = useSelector(state => state.game.view);
  return (
		<Container>
			{getView(view)}
		</Container>
	);
};

export default ImposterViewContainer;
