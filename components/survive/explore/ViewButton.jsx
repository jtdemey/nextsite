import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setGamePanelView } from '../redux/gameSlice';

const Button = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #333333;
`;

const Image = styled.img`
  width: 2.5rem;
  margin: auto;
`;

const ViewButton = props => {
  const dispatch = useDispatch();
  return (
    <Button>
      <Image src={props.imgSrc} onClick={() => dispatch(setGamePanelView(props.gamePanelView))} />
    </Button>
  );
};

ViewButton.propTypes = {
  gamePanelView: PropTypes.number,
  imgSrc: PropTypes.string
};

export default ViewButton;