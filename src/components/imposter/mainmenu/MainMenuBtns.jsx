import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { IMPOSTER_VIEWS, MODAL_VIEWS } from '../redux/imposterConstants';
import { changeGameView, showModal } from '../redux/imposterSlice';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
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
      <MenuButton
        clickFunc={() => dispatch(showModal(MODAL_VIEWS.SETTINGS))}
        text="Settings"
      ></MenuButton>
      <MenuButton
        clickFunc={() => dispatch(showModal(MODAL_VIEWS.RULES))}
        text="How to Play"
      ></MenuButton>
    </Container>
  );
};

export default MainMenuBtns;