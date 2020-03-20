import React from 'react';
import gql from 'graphql-tag';
import {
  Avatar,
  AppBar,
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { MISSING_FIELD } from 'common/constants';
import { parseGender, formatAdress } from '../../helpers';
import { AboutTabFragment as DataType } from './__generated__/AboutTabFragment';

const mockData = {
  groups: [
    {
      id: '1',
      name: 'Android',
      category: 'Technology',
      members: '1.856.546',
    },
    {
      id: '2',
      name: 'Google',
      category: 'Web',
      members: '1.226.121',
    },
    {
      id: '3',
      name: 'Fallout',
      category: 'Games',
      members: '526.142',
    },
  ],
  supervisors: [
    {
      id: '1',
      name: 'Garry Newman',
      avatar: 'assets/images/avatars/garry.jpg',
    },
    {
      id: '2',
      name: 'Carl Henderson',
      avatar: 'assets/images/avatars/carl.jpg',
    },
    {
      id: '3',
      name: 'Jane Dean',
      avatar: 'assets/images/avatars/jane.jpg',
    },
  ],
};

type Props = {
  data: DataType;
};

const AboutTab: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { groups, supervisors } = mockData;
  const address = data.address ? formatAdress(data.address) : MISSING_FIELD;

  return (
    <div className="md:flex max-w-2xl">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
        >
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
                  Gender
                </Typography>
                <Typography>
                  {parseGender(data.gender) || MISSING_FIELD}
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Birthday
                </Typography>
                <Typography>{MISSING_FIELD}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  About Me
                </Typography>
                <Typography>{data.about || MISSING_FIELD}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">GDPR</Typography>
                <Typography>{data.gdpr.toString()}</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Work
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Position
                </Typography>
                <Typography>{data.position || MISSING_FIELD}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Skills
                </Typography>
                <Typography>{MISSING_FIELD}</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Contact
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Address
                </Typography>

                <div className="flex items-center">
                  <Typography>{address}</Typography>
                  <Icon className="text-16 ml-4" color="action">
                    location_on
                  </Icon>
                </div>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Phone
                </Typography>
                <div className="flex items-center">
                  <Typography>{data.phone || MISSING_FIELD}</Typography>
                </div>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Email
                </Typography>

                <div className="flex items-center">
                  <Typography>{data.email || MISSING_FIELD}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </FuseAnimateGroup>
      </div>

      <div className="flex flex-col md:w-320">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
        >
          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Supervisors
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent className="p-0">
              <List className="flex flex-wrap p-8">
                {supervisors.map((supervisor: any) => (
                  <img
                    key={supervisor.id}
                    className="w-64 m-4 rounded-4 block"
                    src={supervisor.avatar}
                    alt={supervisor.name}
                  />
                ))}
              </List>
            </CardContent>
          </Card>

          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Joined Groups
                </Typography>
                <Button className="normal-case" color="inherit" size="small">
                  See 6 more
                </Button>
              </Toolbar>
            </AppBar>
            <CardContent className="p-0">
              <List className="p-0">
                {groups.map((group: any) => (
                  <ListItem key={group.id}>
                    <Avatar className="mx-8" alt={group.name}>
                      {group.name[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <div className="">
                          <Typography
                            className="inline font-medium"
                            color="secondary"
                            paragraph={false}
                          >
                            {group.name}
                          </Typography>

                          <Typography className="inline ml-4" paragraph={false}>
                            {group.category}
                          </Typography>
                        </div>
                      }
                      secondary={group.members}
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
        </FuseAnimateGroup>
      </div>
    </div>
  );
};

export default AboutTab;

export const AboutTabFragment = {
  data: gql`
    fragment AboutTabFragment on User {
      id
      fullName
      email
      gender
      about
      phone
      gdpr
      position
      address {
        street
        zip
        city
        country
      }
    }
  `,
};
