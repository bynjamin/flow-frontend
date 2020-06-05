import React from 'react';
import stc from 'string-to-color';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

type Props = {
  colorString: string;
  classNames?: string;
  children?: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: ({ colorString }: Props) => ({
      color: 'white',
      backgroundColor: stc(colorString),
    }),
  }),
);

const ColorAvatar: React.FC<Props> = props => {
  const classes = useStyles(props);
  return (
    <Avatar className={clsx(classes.avatar, props.classNames)}>
      {props.children}
    </Avatar>
  );
};

export default ColorAvatar;
