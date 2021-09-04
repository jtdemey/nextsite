import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled(animated.h2)`
  margin: 0;
  padding: 1rem 3rem;
  color: #800000;
  font-family: 'DM Serif Display', serif;
  font-size: 3rem;
  opacity: 1;
`;

const DeathHeader = props => {
  const spring = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 20 },
    config: { mass: 3, tension: 480, friction: 200 }
  });
  return (
    <Header style={spring}>
      {props.text}
    </Header>
  );
};

DeathHeader.propTypes = {
  text: PropTypes.string
};

export default DeathHeader;