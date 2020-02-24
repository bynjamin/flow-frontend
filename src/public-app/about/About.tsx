import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import NavigationBar from '../navigation';

const useStyles = makeStyles((theme: any) => ({
  layoutRoot: {},
}));

const About = () => {
  const classes = useStyles();
  return (
    <>
      <NavigationBar />
      <FusePageSimple
        className={classes.layoutRoot}
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
    </>
  );
};

export default About;
