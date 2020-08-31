import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import SubTable from './SubTable';

const columns = [
  { id: 'userId', label: 'User Id', minWidth: 170 },
  { id: 'id', label: 'Id', minWidth: 100 },
  {
    id: 'title',
    label: 'Title',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'body',
    label: 'Body',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  loading: {
    margin: '10px',
  }
});

const Posts = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [posts, setPosts] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [subtableData, setSubtableData] = React.useState({});

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json))
      .catch('Something went wrong');
    setLoading(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, id) => {
    let columns = [];
    let url = '';
    if (event.target.id === 'userId') {
      const columns = [
        { id: 'userId', label: 'User Id', minWidth: 170 },
        { id: 'id', label: 'Id', minWidth: 100 },
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'body', label: 'Body', minWidth: 170 },
      ];
      const url = `/posts?userId=${id}`;
      setSubtableData({ columns, url });
    }
    if (event.target.id === 'body') {
      const columns = [
        { id: 'postId', label: 'Post Id', minWidth: 170 },
        { id: 'id', label: 'Id', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'body', label: 'Body', minWidth: 170 },
      ];
      const url = `/posts/${id}/comments`;
      setSubtableData({ columns, url });
    }
  };

  return (
    <div>
    <Paper className={classes.root}>
      {loading ?
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      :
      <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {(!_.isEmpty(posts)) && posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const idToSend = column.id === 'body' ? row.id : row.userId;
                    return (
                      <TableCell
                        id={column.id}
                        key={column.id}
                        align={column.align}
                        value={value}
                        onClick={column.id === 'body' || column.id === 'userId' ?
                                  (e) => handleClick(e, idToSend) : undefined}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(!_.isEmpty(posts)) ? posts.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>}
    </Paper>
    {(!(_.isEmpty(subtableData))) &&
      <SubTable columns={subtableData.columns} url={subtableData.url} />
    }
    <Paper>

    </Paper>
    </div>
  );
}

export default (Posts);
