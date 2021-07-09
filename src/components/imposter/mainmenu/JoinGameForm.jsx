import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import SubmitButton from '../auxiliary/SubmitButton';
import { submitHostGame, submitJoinGame } from '../redux/imposterSlice';
import BackToMainButton from './BackToMainButton';
import FormInput from './FormInput';

const Header = styled.h2`
  margin: 4rem 0 1rem;
  color: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.8rem;
  text-align: center;
`;

const Form = styled(animated.form)`
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
  const [playerName, setPlayerName] = React.useState('');
  const [gameId, setGameId] = React.useState('');
  const socketId = useSelector(state => state.game.socketId);
  const dispatch = useDispatch();
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 20 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <>
      <Header>Join Game</Header>
      <Form style={spring}>
        <FormInput
          placeholder="Your name"
          setValue={setPlayerName}
          value={playerName}
        />
        <FormInput
          placeholder="Game code"
          setValue={setGameId}
          value={gameId}
        />
        <BtnArea>
          <SubmitButton
            clickFunc={() => dispatch(submitJoinGame({ playerName, gameId, socketId }))}
            text="Play"
          />
          <BackToMainButton />
        </BtnArea>
      </Form>
    </>
  );
};

export default JoinGameForm;
