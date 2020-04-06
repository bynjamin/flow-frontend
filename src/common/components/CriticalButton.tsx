import { withStyles } from '@material-ui/styles';
// eslint-disable-next-line no-unused-vars
import { Theme, Button } from '@material-ui/core';

const CriticalButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Button);

export default CriticalButton;
