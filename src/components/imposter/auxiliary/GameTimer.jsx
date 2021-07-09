import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Container = styled.div`
	width: 9rem;
	margin: 1rem auto 0;
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

const Time = styled.h5`
	font-size: 1.5rem;
	margin: 0.25rem;
`;

const GameTimer = props => {
	const state = useSelector(state => ({
		remainingTime: state.game.remainingTime,
		theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ background: theme.secondary }}>
			<Title>{props.title}</Title>
			<Time>{state.remainingTime}</Time>
		</Container>
	);
};

GameTimer.propTypes = {
	title: PropTypes.string
};

export default GameTimer;