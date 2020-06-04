import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIBackdrop from '@material-ui/core/Backdrop';
import Portal from '@material-ui/core/Portal';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  },
}));

type Props = {
  open: boolean;
  onClick?: () => void;
};

const Backdrop: React.FC<Props> = ({ open, onClick }) => {
  const classes = useStyles();

  return (
    <Portal>
      <MUIBackdrop className={classes.root} open={open} onClick={onClick}>
        <CircularProgress size={60} color="secondary" thickness={3} />
      </MUIBackdrop>
    </Portal>
  );
};

export default Backdrop;
