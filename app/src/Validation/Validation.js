import React from 'react';

const Validation = (props) => {

  let textToDisplay = null;
  if (props.length < 5) {
    if (props.length === 0) {
      textToDisplay = (
        <p className="lengthText">No text at all</p>
      );
    } else {
      textToDisplay = (
        <p className="lengthText">Text too short</p>
      );
    }
  } else {
    textToDisplay = (
      <p className="lengthText">Text long enough</p>
    );
  }
  return(
    <div className="wrapper">
      {textToDisplay}
    </div>
  );
};

export default Validation;
