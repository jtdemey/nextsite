import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PHASES } from '../redux/imposterConstants';

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

const getHeader = isImposter => isImposter ? 'Victory!' : 'Defeat';

const getText = (isImposter, phase) => {
	if(phase === PHASES.TIME_EXPIRED) {
		return isImposter
			? 'Well done! They were none the wiser.'
			: 'The Imposter has infiltrated your ranks!';
	}
	return 'You goofed and accused an innocent Actor!';
};

const ImposterWinView = () => {
	const state = useSelector(state => ({
		imposterId: state.game.imposterId,
		phase: state.game.phase,
		socketId: state.game.socketId
	}));
	const isImposter = state.imposterId === state.socketId;
	return (
		<View>
			<Header>{getHeader(isImposter)}</Header>
			<Text>{getText(isImposter)}</Text>
		</View>
	);
};

export default ImposterWinView;