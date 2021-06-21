import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { IMPOSTER_VIEWS } from '../redux/imposterConstants';
import { changeGameView } from '../redux/imposterSlice';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
`;

const MainMenuBtns = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <MenuButton
        clickFunc={() => dispatch(changeGameView(IMPOSTER_VIEWS.HOST_GAME_FORM))}
        text="Host Game"
      ></MenuButton>
      <MenuButton
        clickFunc={() => dispatch(changeGameView(IMPOSTER_VIEWS.JOIN_GAME_FORM))}
        text="Join Game"
      ></MenuButton>
    </Container>
  );
};

export default MainMenuBtns;