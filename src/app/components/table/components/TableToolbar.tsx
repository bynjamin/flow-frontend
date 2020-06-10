import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalFilter from './GlobalFilter';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    // backgroundColor: 'rgba(0, 0, 0, 0.04)',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '5px 5px 0 0',
  },
  title: {
    flex: '1 1 100%',
    color: theme.palette.common.white,
  },
}));

type Props = {
  title: string;
  numSelected: number;
  setGlobalFilter: any;
  count: number;
  globalFilter: string;
  onCreate?: () => void;
  onDelete: () => void;
  customFilterComponent?: React.ReactNode;
};

const TableToolbar: React.FC<Props> = ({
  title,
  numSelected,
  count,
  setGlobalFilter,
  globalFilter,
  onCreate,
  onDelete,
  customFilterComponent,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={onDelete}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        </>
      ) : (
        <>
          {onCreate && (
            <Tooltip title="Add">
              <IconButton aria-label="add" onClick={onCreate} color="secondary">
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography className={classes.title} variant="h6" id="tableTitle">
            {title}
          </Typography>
        </>
      )}
      {customFilterComponent || (
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
