import React from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { MISSING_FIELD } from 'common/constants';
import { getDetailUrl } from 'app/helpers/linkResolver';
import { ProjectAboutFragment__data as DataType } from './__generated__/ProjectAboutFragment__data';

type Props = {
  data: DataType;
};

const ProjectAbout: React.FC<Props> = ({ data }) => {
  const history = useHistory();

  const redirectToUserDetail = (userId: number) => {
    history.push(getDetailUrl('users', userId));
  };

  if (!data) {
    return null;
  }

  return (
    <div className="md:flex">
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
                  Project name
                </Typography>
                <Typography>{data.name}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Description
                </Typography>
                <Typography>{data.description || MISSING_FIELD}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Created By
                </Typography>

                <Typography>
                  <Link
                    component="button"
                    color="inherit"
                    onClick={() => redirectToUserDetail(data.createdBy.id)}
                  >
                    {data.createdBy.fullName}
                  </Link>
                </Typography>
              </div>
            </CardContent>{' '}
          </Card>
        </FuseAnimateGroup>
      </div>

      <div className="flex flex-col md:w-400">
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
                  Managers
                </Typography>
                <Chip label={data.managers.length} color="secondary" />
              </Toolbar>
            </AppBar>
            <CardContent className="p-0 max-h-320 overflow-auto">
              <List className="p-0">
                {data.managers.map((item: any) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => redirectToUserDetail(item.id)}
                  >
                    <Avatar className="mx-8" alt={item.name}>
                      {item.fullName[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          className="inline font-medium"
                          paragraph={false}
                        >
                          {item.fullName}
                        </Typography>
                      }
                      secondary={item.email}
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

          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Assignees
                </Typography>
                <Chip label={data.assignees.length} color="secondary" />
              </Toolbar>
            </AppBar>
            <CardContent className="p-0 max-h-320 overflow-auto">
              <List className="p-0">
                {data.assignees.map((item: any) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => redirectToUserDetail(item.id)}
                  >
                    <Avatar className="mx-8" alt={item.name}>
                      {item.fullName[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography
                          className="inline font-medium"
                          paragraph={false}
                        >
                          {item.fullName}
                        </Typography>
                      }
                      secondary={item.email}
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

export default ProjectAbout;

export const ProjectAboutFragment = {
  data: gql`
    fragment ProjectAboutFragment__data on Project {
      id
      name
      description
      deleted
      assignees {
        id
        fullName
        email
      }
      managers {
        id
        fullName
        email
      }
      createdBy {
        id
        fullName
      }
    }
  `,
};
