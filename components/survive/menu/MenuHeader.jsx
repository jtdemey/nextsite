import React from 'react';
import { animated, useSpring } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = styled(animated.h2)`
  padding: 2rem;
  color: #f5f5f5;
  font-family: 'DM Serif Display', serif;
  font-size: 3rem;
  opacity: 1;
`;

const MenuHeader = props => {
  const spring = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 20 },
    config: { mass: 1, tension: 480, friction: 120 } 
  });
  return (
    <Header style={spring}>
      {props.text}
    </Header>
  );
};

MenuHeader.propTypes = {
  text: PropTypes.string
};

export default MenuHeader;