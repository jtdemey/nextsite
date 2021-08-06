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
	const [selectedItem, setSelectedItem] = React.useState(false);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View
      onClick={() => setSelectedItem(false)}
      style={{ display: props.active ? 'block' : 'none', ...spring }}>
      <LocaleItemList />
      <InventoryItemList selectedItem={selectedItem} setSelectedItem={x => setSelectedItem(x)} />
    </View>
  );
};

InventoryView.propTypes = {
  active: PropTypes.bool
};

export default InventoryView;
