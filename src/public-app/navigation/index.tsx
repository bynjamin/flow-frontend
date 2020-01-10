import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core/';
import navigationConfig from './navigationConfig';

const useStyles = makeStyles((theme: any) => ({
  layoutRoot: {},
  link: {
    margin: theme.spacing(2),
    color: 'white !important',
    textDecoration: 'none !important',
  },
  activeLink: {
    color: '#61DAFB !important',
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar>
        {navigationConfig.map(item => (
          <NavLink
            key={`nav-item-${item.name}`}
            to={item.link}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            {item.name}
          </NavLink>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
