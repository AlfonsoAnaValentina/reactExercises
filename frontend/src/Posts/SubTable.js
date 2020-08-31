import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '20px',
  },
  container: {
    maxHeight: 440,
  },
});

const SubTable = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (props) {
      fetch(`https://jsonplaceholder.typicode.com${props && props.url}`)
        .then(response => response.json())
        .then(json => setData(json))
        .catch('Something went wrong');
      setLoading(false);
    }

  }

  return (
    <Paper className={classes.root}>
      {loading ?
        <CircularProgress color="secondary" />
      :
      <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props && props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!_.isEmpty(data)) && data.map((row, index) => {
              return (
                <TableRow key={index} hover role="checkbox" tabIndex={-1} key={row.code}>
                  {props.columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                      >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>}
    </Paper>
  );
}

export default (SubTable);
