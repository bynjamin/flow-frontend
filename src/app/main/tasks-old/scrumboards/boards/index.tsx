import React, { useEffect } from 'react';
import { Typography, Icon } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    background: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(
      theme.palette.getContrastText(theme.palette.primary.main),
      0.6,
    ),
    '&:hover': {
      borderColor: fade(
        theme.palette.getContrastText(theme.palette.primary.main),
        0.8,
      ),
    },
  },
}));

const mockProjects = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
];

const Boards: React.FC = props => {
  const boards = mockProjects;
  const classes = useStyles(props);

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-grow flex-shrink-0 flex-col items-center',
      )}
    >
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography
            className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300"
            color="inherit"
          >
            Projects
          </Typography>
        </FuseAnimate>

        <div>
          <FuseAnimateGroup
            className="flex flex-wrap w-full justify-center py-32 px-16"
            enter={{
              animation: 'transition.slideUpBigIn',
              duration: 300,
            }}
          >
            {boards.map(board => (
              <div className="w-224 h-224 p-16" key={board.id}>
                <Link
                  to={'/tasks/boards/' + board.id}
                  className={clsx(
                    classes.board,
                    'flex flex-col items-center justify-center w-full h-full rounded py-24',
                  )}
                  role="button"
                >
                  <Icon className="text-56">assessment</Icon>
                  <Typography
                    className="text-16 font-300 text-center pt-16 px-32"
                    color="inherit"
                  >
                    {board.name}
                  </Typography>
                </Link>
              </div>
            ))}
            <div className="w-224 h-224 p-16">
              <div
                className={clsx(
                  classes.board,
                  classes.newBoard,
                  'flex flex-col items-center justify-center w-full h-full rounded py-24',
                )}
                onClick={() => console.log('new board')}
              >
                <Icon className="text-56">add_circle</Icon>
                <Typography
                  className="text-16 font-300 text-center pt-16 px-32"
                  color="inherit"
                >
                  Add new board
                </Typography>
              </div>
            </div>
          </FuseAnimateGroup>
        </div>
      </div>
    </div>
  );
};

export default Boards;
