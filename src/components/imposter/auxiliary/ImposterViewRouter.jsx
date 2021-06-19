import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IMPOSTER_VIEWS } from '../redux/imposterConstants';

const Router = styled.div`
	width: 100%;
	height: 100%;
`;

const getView = viewIndex => {
	switch(viewIndex) {
		// case IMPOSTER_VIEWS.MAIN_MENU:
		// case IMPOSTER_VIEWS.HOST_GAME_FORM:
		// case IMPOSTER_VIEWS.JOIN_GAME_FORM:
		// case IMPOSTER_VIEWS.LOBBY:
		// case IMPOSTER_VIEWS.IN_GAME:
		// case IMPOSTER_VIEWS.TIME_EXPIRED:
		// case IMPOSTER_VIEWS.IMPOSTER_VICTORY:
		// case IMPOSTER_VIEWS.BYSTANDER_VICTORY:
		// case IMPOSTER_VIEWS.LOADING:
		default:
			return null;
	}
};

const ImposterViewRouter = () => {
	const view = getView(useSelector(state => state.game.view));
  return (
		<Router>

		</Router>
	);
};

export default ImposterViewRouter;
