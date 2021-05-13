import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { initGame } from'../redux/gameSlice';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const IntroCinematic = () => {
  const dispatch = useDispatch();
  return (
    <Button>
      <Image src="survive/gear.svg" />
    </Button>
  );
};

export default IntroCinematic;