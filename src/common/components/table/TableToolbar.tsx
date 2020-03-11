import React from 'react';

import AddUserDialog from './AddUserDialog';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalFilter from './GlobalFilter';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '5px 5px 0 0',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

type Props = {
  numSelected: number;
  addUserHandler: any;
  deleteUserHandler: any;
  setGlobalFilter: any;
  count: number;
  globalFilter: string;
};

const TableToolbar: React.FC<Props> = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    addUserHandler,
    deleteUserHandler,
    count,
    setGlobalFilter,
    globalFilter,
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <AddUserDialog addUserHandler={addUserHandler} />
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteUserHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          count={count}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

export default TableToolbar;
