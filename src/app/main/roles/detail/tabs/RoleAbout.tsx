import React from 'react';
import gql from 'graphql-tag';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Members from 'app/components/Members';
import { MISSING_FIELD } from 'common/constants';
import {
  // eslint-disable-next-line no-unused-vars
  RoleAboutFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  RoleAboutFragment__data_members as MemberType,
} from './__generated__/RoleAboutFragment__data';

type Props = {
  data: DataType;
};

const RoleAbout: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="p-16 sm:p-24">
      <div className="flex flex-col flex-1">
        <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  General Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Role name
                </Typography>
                <Typography>{data.name}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Description
                </Typography>
                <Typography>{data.description || MISSING_FIELD}</Typography>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>

      <div className="flex">
        <div className="w-full h-512">
          <Members
            title={`Users with role ${data.name}`}
            members={data.members}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleAbout;

export const RoleAboutFragment = {
  data: gql`
    fragment RoleAboutFragment__data on UserRole {
      id
      name
      description
      memberCount
      members {
        id
        fullName
        email
      }
    }
  `,
};
