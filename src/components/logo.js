import React from 'react';

const Logo = ({ style }) => {
  return (
    <svg className={style} width="500" height="200" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '0', left: '0' }}>
      <text 
        
        x="50%" 
        y="60%" 
        textAnchor="middle" 
        fill="brown" 
        fontSize="30" 
        fontWeight="bold" 
        letterSpacing="3"
        rotate="10"
        dy=".3em"
    
      >
        CLA-STREAMING
      </text>
    </svg>
  );
}

export default Logo;
