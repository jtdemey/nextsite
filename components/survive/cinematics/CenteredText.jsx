import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled(animated.h4)`
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin: 0;
  padding: 2rem 0;
  color: #f5f5f5;
  font-family: 'DM Serif Display', serif;
  font-size: 1.2rem;
`;

const CenteredText = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, x: -10, y: 0 }));
  React.useEffect(() => api.start(props.visible ? ({ delay: props.delay, opacity: 1, x: 0, y: 0 }) : ({ opacity: 0, x: -10, y: 3 })));
  return (
    <Text style={spring}>
      {props.text}
    </Text>
  );
};

CenteredText.propTypes = {
  delay: PropTypes.number,
  text: PropTypes.string,
  visible: PropTypes.bool
};

export default CenteredText;