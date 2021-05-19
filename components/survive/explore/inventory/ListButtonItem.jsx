import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const ListItem = styled(animated.li)`
  margin: 4px 8px;
  padding: 10px;
  background: linear-gradient(to right, rgba(140, 140, 140, 0.6), rgba(166, 166, 166, 0));
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
`;

const ListButtonItem = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, x: 10 }));
  React.useEffect(() => api.start({opacity: 1, x: 0 }));
  return (
    <ListItem style={spring}>{props.text}</ListItem>
  );
};

ListButtonItem.propTypes = {
  text: PropTypes.string
};

export default ListButtonItem;