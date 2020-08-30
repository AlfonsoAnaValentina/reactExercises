import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const Axis = ({ props }) => {
  const theme = useTheme();
  const [axis, setAxis] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAxisChange = (event) => {
    setAxis(event.target.value);
  };

  return (
    <div>
      { (!props) ?
      <div>Loading</div>
      :
      <FormControl variant="outlined" className="formControl">
        <InputLabel id={`${axis}-column`}>{`${axis} Column`}</InputLabel>
        <Select
          labelId={`${axis}-column`}
          id={`${axis}-column-id`}
          value={axis}
          onChange={(e) => handleAxisChange(e)}
          label={axis}
        >
        {props && props.options.map((item, index) => (
            <MenuItem value={index} key={index}>
              {item}
            </MenuItem>
        ))}
        </Select>
        {error &&
          <FormHelperText>Please Pick another axis</FormHelperText>
        }
      </FormControl>}
    </div>
  );
};

export default (Axis);
