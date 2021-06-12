import React from 'react';

const RoomCanvas = () => {
  React.useEffect(async () => {
    const init = (await import('../../scenes/room/room.js')).default;
    init();
  }, []);
  return (
    <div id="root"></div>
  );
};

export default RoomCanvas;