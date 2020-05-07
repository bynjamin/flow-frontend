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
  UserGroupAboutFragment__data as DataType,
  // eslint-disable-next-line no-unused-vars
  UserGroupAboutFragment__data_members as MemberType,
} from './__generated__/UserGroupAboutFragment__data';

type Props = {
  data: DataType;
};

const UserGroupAbout: React.FC<Props> = ({ data }) => {
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
                  Group name
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

      {/*
        <div className="flex flex-col md:w-320">
          <FuseAnimate animation="transition.slideUpBigIn" delay={300}>
            <Card className="w-full mb-16">
              <AppBar position="static" elevation={0}>
                <Toolbar className="pl-16 pr-8">
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="flex-1"
                  >
                    Users in group
                  </Typography>
                  <Button className="normal-case" color="inherit" size="small">
                    See 6 more
                  </Button>
                </Toolbar>
              </AppBar>
              <CardContent className="p-0">
                <List className="p-0">
                  {data.members.map((member: MemberType) => (
                    <ListItem key={member.id}>
                      <Avatar className="mx-8" alt={member.fullName}>
                        {member.fullName[0]}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography className="inline" paragraph={false}>
                            {member.fullName || MISSING_FIELD}
                          </Typography>
                        }
                        secondary={member.email || MISSING_FIELD}
                      />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </FuseAnimate>
        </div>
        */}
      <div className="flex">
        <div className="w-full h-512">
          <Members members={data.members} />
        </div>
      </div>
    </div>
  );
};

export default UserGroupAbout;

export const UserGroupAboutFragment = {
  data: gql`
    fragment UserGroupAboutFragment__data on UserGroup {
      id
      name
      description
      members {
        id
        title
        fullName
        email
        role {
          id
          name
        }
      }
    }
  `,
};
