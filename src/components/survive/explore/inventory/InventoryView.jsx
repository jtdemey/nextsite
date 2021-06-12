import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import LocaleItemList from './LocaleItemList';
import InventoryItemList from './InventoryItemList';

const View = styled(animated.div)`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const InventoryView = props => {
  const [spring, api] = useSpring(() => ({ display: 'none', opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ display: props.active ? 'block' : 'none', opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={spring}>
      <LocaleItemList />
      <InventoryItemList />
    </View>
  );
};

InventoryView.propTypes = {
  active: PropTypes.bool
};

export default InventoryView;