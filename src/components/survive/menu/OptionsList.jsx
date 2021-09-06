
import React from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSprings } from '@react-spring/web';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled(animated.ul)`
  position: absolute;
  bottom: 0;
  right: 0;
  list-style-type: none;
  text-align: right;
  padding: 4rem 2rem;
`;

const Li = styled(animated.li)`
  padding: 0.5rem 1rem;
  opacity: 1.0;
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
`;

const OptionsList = props => {
  const dispatch = useDispatch();
  const [springs, api] = useSprings(props.listItems.length, i => ({ opacity: 0, x: 80 }));
  React.useEffect(() => api.start(i => ({ delay: (i * 300) + 100, opacity: 1, x: 0 })), []);
  return (
    <List>
      {springs.map((spring, i) => (
        <Li key={i} onClick={() => dispatch(props.listItems[i].action())} style={spring}>
					{props.listItems[i].text}
				</Li>
      ))}
    </List>
  );
};

OptionsList.propTypes = {
  listItems: PropTypes.array
};

export default OptionsList;