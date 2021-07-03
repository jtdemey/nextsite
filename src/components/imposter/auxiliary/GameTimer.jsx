import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0.5rem;
	color: #fff;
	text-align: center;
`;

const Title = styled.h6`
	font-size: 1rem;
`;

const Time = styled.h5`
	font-size: 1.5rem;
`;

const GameTimer = props => {
	const remainingTime = useSelector(state => state.game.remainingTime);
	return (
		<Container>
			<Title>{props.title}</Title>
			<Time>{remainingTime}</Time>
		</Container>
	);
};

GameTimer.propTypes = {
	title: PropTypes.string
};

export default GameTimer;