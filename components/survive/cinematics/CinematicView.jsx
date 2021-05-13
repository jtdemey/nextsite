import React from 'react';
import PropTypes from 'prop-types';
import { useSpring } from '@react-spring/web';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';

const View = styled.div`
  width: 100%;
  height: 100%;
`;

const PauseView = props => {
  const [spring, set] = useSpring(() => ({

  }));
  return (
    <View>
      <MenuHeader text="PAUSED" />
    </View>
  );
};

PauseView.propTypes = {
  active: PropTypes.bool
};

export default PauseView;