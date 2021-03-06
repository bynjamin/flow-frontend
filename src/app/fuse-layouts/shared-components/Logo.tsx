// eslint-disable-next-line no-unused-vars
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import React from 'react';
import { appName } from 'config';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .logo-icon': {
      width: 24,
      height: 24,
      transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    '& .subscription-badge, & .logo-text': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  subscriptionBadge: {
    backgroundColor: '#121212',
    color: '#61DAFB',
  },
  subscriptionBadgeIcon: {
    fontSize: 12,
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex items-center')}>
      <img
        className="logo-icon"
        src="assets/images/logos/flow_min.png"
        alt="logo"
      />
      <Typography
        className="text-16 mx-12 font-light logo-text"
        color="inherit"
      >
        {appName}
      </Typography>
      <div
        className={clsx(
          classes.subscriptionBadge,
          'subscription-badge flex items-center py-4 px-8 rounded',
        )}
      >
        <StarIcon className={classes.subscriptionBadgeIcon} />
        <span className="react-text text-12 mx-4">Premium</span>
      </div>
    </div>
  );
}

export default Logo;
