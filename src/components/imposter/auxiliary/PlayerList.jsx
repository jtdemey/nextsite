import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { accusePlayer } from '../redux/imposterSlice';
import { getTheme } from '../ImposterUtils';

const List = styled.ul`
	margin-top: 2rem;
	padding: 0;
`;

const Item = styled.li`
	width: 14rem;
	height: 2rem;
	border-radius: 4px;	
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.25rem;
	list-style-type: none;
	line-height: 2rem;
	margin: 4px auto;
	padding: 0.25rem 0;
`;

const PlayerList = props => {
	const state = useSelector(state => ({
		gameId: state.game.gameId,
    isReady: state.game.isReady,
    isAccusing: state.game.isAccusing,
    socketId: state.game.socketId,
    theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	const dispatch = useDispatch();
	return (
		<List>
			{props.players.map(player => (
				<Item
					key={player.socketId}
					onClick={state.isAccusing && player.socketId !== state.socketId
						? () => dispatch(accusePlayer({
								accusedId: player.socketId,
								accuserId: state.socketId,
								gameId: state.gameId
							}))
						: () => false}
					style={{
						background: theme.secondary
					}}
				>
					{player.name}
				</Item>
			))}
		</List>
	);
};

PlayerList.propTypes = {
	players: PropTypes.array
};

export default PlayerList;