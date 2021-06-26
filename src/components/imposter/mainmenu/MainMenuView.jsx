import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainMenuBtns from './MainMenuBtns';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const MainMenuView = () => {
  return (
    <View>
			<MainMenuBtns />
    </View>
  );
};

MainMenuView.propTypes = {
  active: PropTypes.bool
};

export default MainMenuView;