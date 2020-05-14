import React from 'react';
import stc from 'string-to-color';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface Props {
  colorString: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: ({ colorString }: Props) => ({
      // color: theme.palette.getContrastText(stc(colorString)),
      backgroundColor: stc(colorString),
    }),
  }),
);

const ColorAvatar: React.FC<Props> = props => {
  const classes = useStyles(props);
  return (
    <Avatar className={classes.avatar} {...props}>
      {props.children}
    </Avatar>
  );
};

export default ColorAvatar;
