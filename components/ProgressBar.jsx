import React from 'react';

const ProgressBar = ({ color, backgroundColor, value }) => {
  const containerStyles = {
    height: '8px',
    width: '100%',
    backgroundColor: backgroundColor || '#e0e0e0',
    borderRadius: '10px',
  };

  const fillerStyles = {
    height: '100%',
    width: `${value}%`,
    backgroundColor: color || '#4caf50',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
