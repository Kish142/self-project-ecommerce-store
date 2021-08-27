import React, { useEffect } from 'react';

import './LoadingSpinner.styles.scss';

const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden', 'important');
    return () => {
      document.body.style.setProperty('overflow', 'auto');
    };
  }, []);

  return (
    <div className='loading-spinner'>
      <div className='loading-spinner-wrapper'>
        <div className='content'>
          <div className='spinner'></div>
          <h3 className='loading-text'>Loading...</h3>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
