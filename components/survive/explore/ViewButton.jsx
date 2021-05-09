import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #333333;
`;

const Image = styled.img`
  width: 2.5rem;
  margin: auto;
`;

const ViewButton = props => {
  return (
    <Button>
      <Image src={props.imgSrc} />
    </Button>
  );
};

ViewButton.propTypes = {
  imgSrc: PropTypes.string
};

export default ViewButton;