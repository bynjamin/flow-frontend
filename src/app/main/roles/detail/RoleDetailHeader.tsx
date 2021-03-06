import React from 'react';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import RoleIcon from '@material-ui/icons/AccountBox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { RoleDetailHeaderFragment__data as DataType } from './__generated__/RoleDetailHeaderFragment__data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerIcon: {
      fontSize: 64,
    },
  }),
);

type Props = {
  data: DataType;
};

const RoleDetail: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <RoleIcon className={classes.headerIcon} />
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {`${data.name} role`}
          </Typography>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default RoleDetail;

export const RoleDetailHeaderFragment = {
  data: gql`
    fragment RoleDetailHeaderFragment__data on UserRole {
      name
    }
  `,
};
