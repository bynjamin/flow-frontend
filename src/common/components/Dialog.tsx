import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MUIDialog from '@material-ui/core/Dialog';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import MUIDialogContent from '@material-ui/core/DialogContent';
import MUIDialogContentText from '@material-ui/core/DialogContentText';
import MUIDialogActions from '@material-ui/core/DialogActions';
import { ThemeProvider } from '@material-ui/core/styles';

type Props = {
  title?: React.ReactNode | string;
  content?: React.ReactNode;
  contentText?: string;
  actions?: React.ReactNode;
  controller?: React.ReactNode;
};

const Dialog: React.FC<Props> = ({
  title,
  content,
  contentText,
  actions,
  controller,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      {!!controller && <div onClick={toggleOpen}>{controller}</div>}
      <MUIDialog
        open={!controller || isOpen}
        onClose={toggleOpen}
        aria-labelledby="dialog-title"
      >
        {title && <MUIDialogTitle id="dialog-title">{title}</MUIDialogTitle>}
        <MUIDialogContent>
          {contentText && (
            <MUIDialogContentText>{contentText}</MUIDialogContentText>
          )}
          {content}
        </MUIDialogContent>
        {actions && <MUIDialogActions>{actions}</MUIDialogActions>}
      </MUIDialog>
    </ThemeProvider>
  );
};

export default Dialog;
