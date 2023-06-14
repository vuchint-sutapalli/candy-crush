import React, { useState } from 'react';
import './index.css';

import Candy from '../candy';


const StripedCandy = (props) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleClick = () => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000); // Reset animation after 1 second
  };

  return (
    <div className={`striped-candy ${isAnimated ? 'striped-candy-animated' : ''}`} onClick={handleClick}>
      {
        props.children
      }
    </div>
  );
};

export default StripedCandy;
