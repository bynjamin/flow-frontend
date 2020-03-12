import React from 'react';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {
  makeStyles,
  useTheme,
  withTheme,
  fade,
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  button: {
    color: fade(theme.palette.common.white, 0.9),
    '&:disabled': {
      color: fade(theme.palette.common.white, 0.4),
      backgroundColor: 'transparent,',
    },
  },
}));

type Props = {
  count: number;
  onChangePage: any;
  page: number;
  rowsPerPage: number;
};

const TablePaginationActions: React.FC<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  // @ts-ignore
  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };
  // @ts-ignore
  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };
  // @ts-ignore
  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };
  // @ts-ignore
  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.button}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        className={classes.button}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

export default TablePaginationActions;
