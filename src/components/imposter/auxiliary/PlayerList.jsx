import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { accusePlayer } from '../redux/imposterSlice';
import { getTheme } from '../ImposterUtils';

const List = styled.ul`
	margin-top: 3rem;
`;

const Item = styled.li`
	width: 14rem;
	height: 2rem;
	margin: 4px auto;
	border-radius: 4px;	
	color: #fff;
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
					onClick={state.isAccusing
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