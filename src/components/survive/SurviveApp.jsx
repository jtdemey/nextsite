import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { gameTick } from './redux/gameSlice';
import ViewRouter from './ViewRouter';
import { getTheme } from './ui/themes';

/*
$black-bean: #460c0cff;
$up-maroon: #7d0013ff;
$bittersweet-shimmer: #b4575cff;
$deep-taupe: #81676bff;
$dim-gray: #706c6fff;
$black-coffee: #443c41ff;
*/

const App = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SurviveApp = () => {
  const theme = getTheme(useSelector(state => state.player.region));
  const dispatch = useDispatch();
  React.useEffect(() => setInterval(() => {
    dispatch(gameTick());
  }, 500), []);
  return (
    <App style={{background: theme.base1}}>
      <ViewRouter />
    </App>
  );
};

export default SurviveApp;
