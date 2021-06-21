import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ImposterViewRouter from './auxiliary/ImposterViewRouter';
import { getTheme } from './ImposterUtils';

const App = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImposterApp = () => {
	const theme = getTheme(useSelector(state => state.game.theme));
  return (
		<App style={{ background: theme.primary }}>
			<ImposterViewRouter />
		</App>
	);
};

export default ImposterApp;
