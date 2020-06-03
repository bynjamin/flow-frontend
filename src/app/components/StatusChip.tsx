import React from 'react';
import Chip from '@material-ui/core/Chip';
import {
  AccessTime,
  PlayCircleFilled,
  ErrorOutline,
  CheckCircle,
} from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

const STATUS_COLORS = {
  'Not Started': '#FF994C',
  'In progress': '#55C39E',
  Waiting: blue[500],
  Finished: red[400],
};

const STATUS_ICON = {
  'Not Started': <ErrorOutline />,
  'In progress': <PlayCircleFilled />,
  Waiting: <AccessTime />,
  Finished: <CheckCircle />,
};

type Props = {
  status: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ status }: Props) => ({
      // @ts-ignore todo: Otypovat na backende status
      backgroundColor: STATUS_COLORS[status],
      // @ts-ignore
      color: 'white',
    }),
    icon: {
      color: 'white',
    },
  }),
);

const StatusChip = (props: Props) => {
  const classes = useStyles(props);

  return (
    <Chip
      label={props.status}
      classes={classes}
      // @ts-ignore
      icon={STATUS_ICON[props.status]}
    />
  );
};

export default StatusChip;
