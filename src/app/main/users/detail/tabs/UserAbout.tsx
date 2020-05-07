import React from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { MISSING_FIELD } from 'common/constants';
import { parseGender, formatAdress } from '../../helpers';
import { getDetailUrl } from 'app/helpers/linkResolver';
// eslint-disable-next-line no-unused-vars
import { UserAboutFragment__data as DataType } from './__generated__/UserAboutFragment__data';

type Props = {
  data: DataType;
};

const UserAbout: React.FC<Props> = ({ data }) => {
  const history = useHistory();

  function redirectToGroupDetail(groupId: number) {
    history.push(getDetailUrl('userGroups', groupId));
  }

  if (!data) {
    return null;
  }

  const {
    title,
    firstName,
    lastName,
    email,
    gender,
    phone,
    about,
    role,
    position,
    groups,
    gdpr,
    employmentType,
  } = data;

  const address = data.address ? formatAdress(data.address) : MISSING_FIELD;

  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
        >
          {!gdpr && (
            <Alert severity="warning" className="mb-12">
              <AlertTitle>GDPR is not confirmed</AlertTitle>
              Confirm the GDPR
            </Alert>
          )}
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
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    Title
                  </Typography>
                  <Typography>{title}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    First Name
                  </Typography>
                  <Typography>{firstName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    Last Name
                  </Typography>
                  <Typography>{lastName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    Gender
                  </Typography>
                  <Typography>
                    {parseGender(gender) || MISSING_FIELD}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    Birthday
                  </Typography>
                  <Typography>{MISSING_FIELD}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className="font-bold mb-4 text-15">
                    GDPR
                  </Typography>
                  <Typography>{gdpr.toString()}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="font-bold mb-4 text-15">
                    About
                  </Typography>
                  <Typography>{about}</Typography>
                </Grid>
              </Grid>
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
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Role
                  </Typography>
                  <Typography>{role.name || MISSING_FIELD}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Position
                  </Typography>
                  <Typography>{position || MISSING_FIELD}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Employment Type
                  </Typography>
                  <Typography>{employmentType || MISSING_FIELD}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Skills
                  </Typography>
                  <Typography>{MISSING_FIELD}</Typography>
                </Grid>
              </Grid>
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
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography className="font-bold mb-4 text-15">
                    Address
                  </Typography>

                  <div className="flex items-center">
                    <Typography>{address}</Typography>
                    <Icon className="text-16 ml-4" color="action">
                      location_on
                    </Icon>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Phone
                  </Typography>
                  <Typography>{phone || MISSING_FIELD}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="font-bold mb-4 text-15">
                    Email
                  </Typography>
                  <Typography>{email || MISSING_FIELD}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </FuseAnimateGroup>
      </div>

      <div className="flex flex-col md:w-400">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
          }}
        >
          {/*
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
          */}

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
                <Chip
                  label={`Member of ${groups.length} ${
                    groups.length > 1 ? 'groups' : 'group'
                  }`}
                  color="secondary"
                />
              </Toolbar>
            </AppBar>
            <CardContent className="p-0 max-h-320 overflow-auto">
              <List className="p-0">
                {groups.map((group: any) => (
                  <ListItem
                    key={group.id}
                    button
                    onClick={() => redirectToGroupDetail(group.id)}
                  >
                    <Avatar className="mx-8" alt={group.name}>
                      {group.name[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          className="inline font-medium"
                          paragraph={false}
                        >
                          {group.name}
                        </Typography>
                      }
                      secondary={`${group.memberCount} members`}
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

export default UserAbout;

export const UserAboutFragment = {
  data: gql`
    fragment UserAboutFragment__data on User {
      id
      title
      firstName
      lastName
      email
      role {
        id
        name
      }
      gender
      about
      phone
      gdpr
      position
      employmentType
      address {
        street
        zip
        city
        country
      }
      groups {
        id
        name
        memberCount
      }
    }
  `,
};
