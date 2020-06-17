import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
  return(
    <div className="wrapper">
      <p className="firstP">Username: {props.userName}</p>
      <p className="secondP">This will be overwritten</p>
    </div>
  );
};

export default UserOutput;
