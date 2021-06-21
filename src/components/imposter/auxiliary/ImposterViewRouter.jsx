import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import HostGameForm from '../mainmenu/HostGameForm';
import MainMenuView from '../mainmenu/MainMenuView';
import { IMPOSTER_VIEWS } from '../redux/imposterConstants';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const getView = viewIndex => {
	switch(viewIndex) {
		case IMPOSTER_VIEWS.MAIN_MENU:
			return <MainMenuView />;
		case IMPOSTER_VIEWS.HOST_GAME_FORM:
			return <HostGameForm />;
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
