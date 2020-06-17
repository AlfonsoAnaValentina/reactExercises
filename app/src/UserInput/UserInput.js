import React from 'react';

const UserInput = (props) => {

  const styles = {
    width: '60%',
    height: '30px',
    borderRadius: '4px'
  };


  return (
    <input type="text" onChange={props.changeName} value={props.name} style={styles} />
  );
};

export default UserInput;
