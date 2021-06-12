import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { resumeGame } from '../redux/gameSlice';

const Button = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  margin: 2rem;
`;

const Image = styled.img`
  width: 1.5rem;
  margin: auto;
`;

const ExitMenuButton = () => {
  const dispatch = useDispatch();
  return (
    <Button>
      <Image src="survive/x.svg" onClick={() => dispatch(resumeGame())} />
    </Button>
  );
};

export default ExitMenuButton;