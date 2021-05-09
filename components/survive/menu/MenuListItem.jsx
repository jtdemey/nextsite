import React from 'react';
import { animated } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Li = styled(animated.li)`
  color: #f5f5f5;
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
`;

const MenuListItem = props => (
  <Li onClick={() => props.clickAction()}>
    {props.text}
  </Li>
);

MenuListItem.propTypes = {
  clickAction: PropTypes.func,
  text: PropTypes.string
};

export default MenuListItem;