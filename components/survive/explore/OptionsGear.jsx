import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { switchGameState } from '../redux/gameSlice';

const Button = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 1.5rem;
  margin: auto;
`;

const OptionsGear = () => {
  const dispatch = useDispatch();
  
  return (
    <Button>
      <Image src="survive/gear.svg" />
    </Button>
  );
};

export default OptionsGear;