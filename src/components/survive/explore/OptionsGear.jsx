import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showOptions } from '../redux/gameSlice';

const Button = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
	margin: 0 0.25rem;
`;

const Image = styled.img`
  width: 1.5rem;
  margin: auto;
`;

const OptionsGear = () => {
  const dispatch = useDispatch();
  return (
    <Button>
      <Image src="survive/gear.svg" onClick={() => dispatch(showOptions())} />
    </Button>
  );
};

export default OptionsGear;