import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Text = styled(animated.h4)`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 2rem;
  width: 100%;
  justify-content: center;
  text-align: center;
  margin: auto;
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
`;

const SkipPrompt = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 20 }));
  React.useEffect(() => api.start(props.visible ? ({ opacity: 1, y: 0 }) : ({ opacity: 0, y: 0 })));
  React.useEffect(() => setTimeout(() => api.start({ opacity: 0, y: 0 }), 3000), [props.visible]);
  return (
    <Text style={spring}>
      Tap to skip cutscene
    </Text>
  );
};

SkipPrompt.propTypes = {
  visible: PropTypes.bool
};

export default SkipPrompt;