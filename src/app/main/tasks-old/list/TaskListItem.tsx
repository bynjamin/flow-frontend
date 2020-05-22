import React from 'react';
import {
  IconButton,
  Icon,
  Typography,
  Checkbox,
  ListItem,
} from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { find, truncate } from 'lodash';
import TaskChip from './TaskChip';
import { tasksMockData } from './TasksMockData';

const useStyles = makeStyles({
  todoItem: {
    '&.completed': {
      background: 'rgba(0,0,0,0.03)',
      '& .todo-title, & .todo-notes': {
        textDecoration: 'line-through',
      },
    },
  },
  labels: {},
});

type Props = {
  task: any;
};

const TaskListItem: React.FC<Props> = props => {
  const { labels } = tasksMockData;
  const classes = useStyles(props);

  return (
    <ListItem
      className={clsx(
        classes.todoItem,
        { completed: props.task.completed },
        'border-solid border-b-1 py-16 px-0 sm:px-8',
      )}
      onClick={ev => {
        ev.preventDefault();
        console.log('open detail');
      }}
      dense
      button
    >
      <Checkbox
        tabIndex={-1}
        disableRipple
        checked={props.task.completed}
        onChange={() => console.log('task completed')}
        onClick={ev => ev.stopPropagation()}
      />

      <div className="flex flex-1 flex-col relative overflow-hidden px-8">
        <Typography
          variant="subtitle1"
          className="todo-title truncate"
          color={props.task.completed ? 'textSecondary' : 'inherit'}
        >
          {props.task.title}
        </Typography>

        <Typography color="textSecondary" className="todo-notes truncate">
          {truncate(props.task.notes.replace(/<(?:.|\n)*?>/gm, ''), {
            length: 180,
          })}
        </Typography>

        <div className={clsx(classes.labels, 'flex -mx-2')}>
          {props.task.labels.map((label: any) => (
            <TaskChip
              className="mx-2 mt-4"
              title={find(labels, { id: label })!.title}
              color={find(labels, { id: label })!.color}
              key={label}
            />
          ))}
        </div>
      </div>

      <div className="px-8">
        <IconButton
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('task important toggle');
          }}
        >
          {props.task.important ? (
            <Icon style={{ color: red[500] }}>error</Icon>
          ) : (
            <Icon>error_outline</Icon>
          )}
        </IconButton>
        <IconButton
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('task starred toggle');
          }}
        >
          {props.task.starred ? (
            <Icon style={{ color: amber[500] }}>star</Icon>
          ) : (
            <Icon>star_outline</Icon>
          )}
        </IconButton>
      </div>
    </ListItem>
  );
};

export default TaskListItem;
