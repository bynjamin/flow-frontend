import React, { useEffect, useState } from 'react';
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
import { FuseAnimateGroup } from '@fuse';
import axios from 'axios';

const mockData = {
  general: {
    gender: 'Male',
    birthday: 'February 30th, 1974',
    locations: ['London, UK', 'New York, USA'],
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.',
  },
  work: {
    occupation: 'Developer',
    skills: 'C#, PHP, Javascript, Angular, JS, HTML, CSS',
    jobs: [
      {
        company: 'Self-Employed',
        date: '2010 - Now',
      },
      {
        company: 'Google',
        date: '2008 - 2010',
      },
    ],
  },
  contact: {
    address:
      'Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.',
    tel: ['+6 555 6600', '+9 555 5255'],
    websites: ['withinpixels.com'],
    emails: ['mail@withinpixels.com', 'mail@creapond.com'],
  },
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
  data: any;
};

const AboutTab: React.FC<Props> = ({ data }) => {
  const [datax, setDatax] = useState<any>(mockData);
  /*
  useEffect(() => {
    axios.get('/api/profile/about').then(res => {
      setData(res.data);
    });
  }, []);
  */

  if (!data) {
    return null;
  }

  const { general, work, contact, groups, supervisors } = datax;

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
                <Typography>{data.gender}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Birthday
                </Typography>
                <Typography>{general.birthday}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Locations
                </Typography>

                {general.locations.map((location: any) => (
                  <div className="flex items-center" key={location}>
                    <Typography>{location}</Typography>
                    <Icon className="text-16 ml-4" color="action">
                      location_on
                    </Icon>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  About Me
                </Typography>
                <Typography>{data.about}</Typography>
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
                  Occupation
                </Typography>
                <Typography>{work.occupation}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Skills
                </Typography>
                <Typography>{work.skills}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Jobs</Typography>
                <table className="">
                  <tbody>
                    {work.jobs.map((job: any) => (
                      <tr key={job.company}>
                        <td className="pr-16">
                          <Typography>{job.company}</Typography>
                        </td>
                        <td>
                          <Typography color="textSecondary">
                            {job.date}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <Typography>{contact.address}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                {contact.tel.map((tel: any) => (
                  <div className="flex items-center" key={tel}>
                    <Typography>{tel}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Website
                </Typography>

                {contact.websites.map((website: any) => (
                  <div className="flex items-center" key={website}>
                    <Typography>{website}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Emails
                </Typography>

                {contact.emails.map((email: any) => (
                  <div className="flex items-center" key={email}>
                    <Typography>{email}</Typography>
                  </div>
                ))}
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
