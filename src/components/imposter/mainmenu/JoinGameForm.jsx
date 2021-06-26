import React from 'react';
import styled from 'styled-components';
import SubmitButton from '../auxiliary/SubmitButton';
import BackToMainButton from './BackToMainButton';
import FormInput from './FormInput';

const Header = styled.h2`
	margin: 4rem 0 1rem;
	color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.8rem;
	text-align: center;
`;

const Form = styled.form`
	display: flex;
	flex-flow: column;
	width: 100%;
`;

const BtnArea = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const JoinGameForm = () => {
  return (
		<>
			<Header>Join Game</Header>
			<Form>
				<FormInput placeholder="Your name" />
				<FormInput placeholder="Game code" />
				<BtnArea>
					<SubmitButton text="Join" />
					<BackToMainButton />
				</BtnArea>
			</Form>
		</>
  );
};

export default JoinGameForm;