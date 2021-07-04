import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0.5rem;
`;

const VoteBox = styled.div`
	max-width: 80%;
	height: 36px;
  margin: auto;
  text-align: center;
  padding-top: 0.3em;
`;

const VoteArea = () => {
	const votes = useSelector(state => state.game.votes);
	return (
		<Container>
			{votes.map(vote => (
				<VoteBox key={vote.voteId}>
					<p>{vote.text}</p>
				</VoteBox>
			))}
		</Container>
	);
};

export default VoteArea;