import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const error = ({ props }) => (
    <div>
      <Paper elevation={3} className="errorImgWrapper">
        <img alt="404" className="errorImg" src={require('../images/404.png')} />
        <Typography variant="h4" component="h4">
          Oops We're having trouble with our provider!
        </Typography>
      </Paper>
    </div>
);

export default error;
