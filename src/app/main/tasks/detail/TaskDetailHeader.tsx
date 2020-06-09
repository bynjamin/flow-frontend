import React, { useContext } from 'react';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import TaskIcon from '@material-ui/icons/CheckBox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
import DeleteTaskDialog, { DeleteTaskDialogFragment } from './DeleteTaskDialog';
import UpdateTaskDialog, { UpdateTaskDialogFragment } from './UpdateTaskDialog';

import { TaskDetailHeaderFragment__data as DataType } from './__generated__/TaskDetailHeaderFragment__data';
import { AppContext } from 'app/AppContext';

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

const TaskDetailHeader: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { permissions, user } = useContext(AppContext);

  const isOwner = () => data.createdBy.id === user?.id;
  const isAssignee = () =>
    data.assignees.some(assignee => assignee.id === user?.id);
  const isProjectManager = () =>
    data.project.managers.some(manager => manager.id === user?.id);

  const canUpdate = () => {
    if (isOwner() || isProjectManager() || isAssignee()) {
      return permissions.Project.basic.update;
    }
    return permissions.Project.global.update;
  };

  const canDelete = () => {
    if (isOwner() || isProjectManager()) {
      return permissions.Project.basic.delete;
    }
    return permissions.Project.global.delete;
  };

  if (!data) {
    return null;
  }

  return (
    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
      <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <TaskIcon className={classes.headerIcon} />
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="md:ml-24" variant="h4" color="inherit">
            {data.name || MISSING_FIELD} {data.deleted && '(deleted)'}
          </Typography>
        </FuseAnimate>
      </div>
      {!data.deleted && (
        <div className="flex items-center justify-end">
          {canUpdate() && <UpdateTaskDialog data={data} />}
          {canDelete() && <DeleteTaskDialog data={data} />}
        </div>
      )}
    </div>
  );
};

export default TaskDetailHeader;

export const TaskDetailHeaderFragment = {
  data: gql`
    fragment TaskDetailHeaderFragment__data on Task {
      id
      name
      deleted
      createdBy {
        id
      }
      assignees {
        id
      }
      project {
        id
        managers {
          id
        }
      }
      ...DeleteTaskDialogFragment__data
      ...UpdateTaskDialogFragment__data
    }
    ${DeleteTaskDialogFragment.data}
    ${UpdateTaskDialogFragment.data}
  `,
};
