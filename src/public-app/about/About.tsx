import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core/';
import { FusePageSimple, DemoContent } from '@fuse';

const useStyles = makeStyles(theme => ({
  layoutRoot: {},
  link: {
    margin: theme.spacing(2),
    color: 'white !important',
    textDecoration: 'none !important',
  },
  activeLink: {
    color: '#039be5 !important',
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <FusePageSimple
      className={classes.layoutRoot}
      header={
        <AppBar>
          <Toolbar>
            <NavLink
              to="/about"
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              About
            </NavLink>
            <NavLink
              to="/pricing"
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/register"
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              Register
            </NavLink>
          </Toolbar>
        </AppBar>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Content Toolbar</h4>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Public Content</h4>
          <br />
          <DemoContent />
        </div>
      }
    />
  );
};

export default About;
