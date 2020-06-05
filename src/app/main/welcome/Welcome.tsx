import React from 'react';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';

const Welcome = () => (
  <div className="flex flex-1 justify-center items-center h-full">
    <FuseAnimate animation="transition.slideUpBigIn" delay={800}>
      <Typography className="font-hairline" variant="h2">
        Welcome to Flow!
      </Typography>
    </FuseAnimate>
  </div>
);

export default Welcome;
