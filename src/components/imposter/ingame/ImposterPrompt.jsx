import React from 'react';
import styled from 'styled-components';

const Prompt = styled.div`
	text-align: center;
`;

const ImposterPrompt = () => {
	return (
		<Prompt>
			<h3>You are the Imposter.</h3>
			<h3>Try to deduce the scenario</h3>
			<h3>and blend in until time runs out.</h3>
		</Prompt>
	);
};

export default ImposterPrompt;