import React from 'react';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import TaskIcon from '@material-ui/icons/CheckBox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { MISSING_FIELD } from 'common/constants';
/*
import DeleteProjectDialog, {
  DeleteProjectDialogFragment,
} from './DeleteProjectDialog';
import UpdateProjectDialog, {
  UpdateProjectDialogFragment,
} from './UpdateProjectDialog';
*/
import { TaskDetailHeaderFragment__data as DataType } from './__generated__/TaskDetailHeaderFragment__data';

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
      {/*
      {!data.deleted && (
        <div className="flex items-center justify-end">
          <UpdateProjectDialog data={data} />
          <DeleteProjectDialog data={data} />
        </div>
      )}
      */}
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
    }
  `,
};
