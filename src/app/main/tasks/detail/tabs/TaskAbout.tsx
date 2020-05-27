import React from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
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
import StatusChip from 'app/components/StatusChip';
import Link from '@material-ui/core/Link';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { MISSING_FIELD } from 'common/constants';
import { getDetailUrl } from 'app/helpers/linkResolver';
import { TaskAboutFragment__data as DataType } from './__generated__/TaskAboutFragment__data';

type Props = {
  data: DataType;
};

const TaskAbout: React.FC<Props> = ({ data }) => {
  const history = useHistory();

  const redirectToUserDetail = (userId: number) => {
    history.push(getDetailUrl('users', userId));
  };

  const redirectToProjectDetail = (projectId: number) => {
    history.push(getDetailUrl('projects', projectId));
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
          {data.deleted && (
            <Alert severity="error" className="mb-12">
              <AlertTitle>This record is deleted</AlertTitle>
              There is no actions permited on this record. To restore it,
              contact our support please.
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
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Task name
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
                  Status
                </Typography>
                <StatusChip status={data.status} />
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Deadline
                </Typography>
                <Typography>{data.deadline || MISSING_FIELD}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Project
                </Typography>
                <Typography>
                  <Link
                    component="button"
                    color="inherit"
                    underline="always"
                    onClick={() =>
                      redirectToProjectDetail(Number(data.project.id))
                    } // todo: Odstranit po fixe na
                  >
                    {data.project.name}
                  </Link>
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Created By
                </Typography>
                <Typography>
                  <Link
                    component="button"
                    color="inherit"
                    underline="always"
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

export default TaskAbout;

export const TaskAboutFragment = {
  data: gql`
    fragment TaskAboutFragment__data on Task {
      id
      name
      description
      deleted
      status
      deadline
      assignees {
        id
        fullName
        email
      }
      project {
        id
        name
      }
      createdBy {
        id
        fullName
      }
    }
  `,
};
