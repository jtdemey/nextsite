import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0.5rem;
`;

const VoteBox = styled.div`
	border-radius: 0.5rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	max-width: 80%;
	height: 36px;
  margin: auto;
  text-align: center;
  padding-top: 0.3em;
	& > p {
		margin: 0;
		padding-top: 0.25rem;
	}
`;

const VoteArea = () => {
	const votes = useSelector(state => state.game.votes);
	return (
		<Container style={{ display: votes.length ? 'block' : 'none' }}>
			{votes.map(vote => (
				<VoteBox key={vote.voteId}>
					<p>{vote.text}</p>
				</VoteBox>
			))}
		</Container>
	);
};

export default VoteArea;