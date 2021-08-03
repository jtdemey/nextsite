import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ViewButton from './ViewButton';
import { getTheme } from '../ui/themes';

const BtnBar = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #333333;
`;

const ButtonBar = () => {
  const theme = getTheme(useSelector(state => state.player.region));
  return (
    <BtnBar style={{ background: theme.base2 }}>
      <ViewButton gamePanelView={0} imgSrc="survive/tabicon1.svg" />
      <ViewButton gamePanelView={1} imgSrc="survive/tabicon2.svg" />
      <ViewButton gamePanelView={2} imgSrc="survive/tabicon3.svg" />
      <ViewButton gamePanelView={3} imgSrc="survive/tabicon4.svg" />
    </BtnBar>
  );
};

export default ButtonBar;
