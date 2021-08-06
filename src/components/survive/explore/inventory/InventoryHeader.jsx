import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { capitalize } from '../../SurviveUtils';

const Header = styled(animated.h3)`
  margin: 0;
  padding: 1rem 0.5rem 0;
  font-family: 'Newsreader', serif;
  color: #f5f5f5;
`;

const InventoryHeader = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 20 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Header style={spring}>{capitalize(props.text)}</Header>
  );
};

InventoryHeader.propTypes = {
  text: PropTypes.string
};

export default InventoryHeader;
