import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
	margin-top: 3rem;
`;

const Item = styled.li`
	width: 14rem;
	height: 2rem;
	margin: 4px auto;
	border-radius: 4px;	
`;

const PlayerList = props => {
	return (
		<List>
			{props.players.map(player => (
				<Item key={player.socketId}>
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