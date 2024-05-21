import React from "react";
import "./about.css"
const Back = ({ name, title, cover }) => {
  const backgroundStyle = {
    backgroundImage: `url(${cover})`,
  };

  return (
    <div className="overlay12">
    <div className="back bg-opacity-25" style={backgroundStyle}>
      <div className="container22">
    
        <span>{name}</span>
        <h2>{title}</h2>
      </div>
    </div>
    </div>
  );
};

export default Back;