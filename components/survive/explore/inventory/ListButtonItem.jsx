import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const ListItem = styled(animated.li)`
  margin: 4px 8px;
  padding: 0.5rem;
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
`;

const SubSpan = styled.span`
  font-size: 0.85rem;
`;

const SvgSpan = styled.span`
  padding-left: 1rem;
  svg {
    width: 1rem;
    position:absolute;
    top:50%;
    bottom:50%;
    transform:translate(-50%, -50%);
  }
`;

const getLinearGradientCss = rgb => `linear-gradient(to right, rgba(${rgb || '140, 140, 140'}, 0.6), rgba(166, 166, 166, 0))`;

const ListButtonItem = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, x: 10 }));
  React.useEffect(() => api.start({opacity: 1, x: 0 }));
  return (
    <ListItem onClick={() => props.clickFunc()} style={{
      ...spring,
      background: getLinearGradientCss(props.rgb),
      marginLeft: props.indentationLevel ? `${props.indentationLevel}rem` : '0rem'
    }}>
      {props.text}
      <SubSpan>{` ${props.subText || ''}`}</SubSpan>
      <SvgSpan>{props.subSvg || null}</SvgSpan>
    </ListItem>
  );
};

ListButtonItem.propTypes = {
  clickFunc: PropTypes.func,
  indentationLevel: PropTypes.number,
  rgb: PropTypes.string,
  subSvg: PropTypes.object,
  subText: PropTypes.string,
  text: PropTypes.string
};

export default ListButtonItem;