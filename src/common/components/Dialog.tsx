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
  openController?: React.ReactNode;
  closeController?: React.ReactNode;
};

const Dialog: React.FC<Props> = ({
  title,
  content,
  contentText,
  actions,
  openController,
  closeController,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  // @ts-ignore
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme); // todo: Odstranit redux

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      {!!openController && <div onClick={toggleOpen}>{openController}</div>}
      <MUIDialog
        open={!openController || isOpen}
        onClose={toggleOpen}
        aria-labelledby="dialog-title"
      >
        {title && <MUIDialogTitle id="dialog-title">{title}</MUIDialogTitle>}
        <MUIDialogContent className="min-w-400">
          {contentText && (
            <MUIDialogContentText>{contentText}</MUIDialogContentText>
          )}
          {content}
        </MUIDialogContent>
        {(actions || closeController) && (
          <MUIDialogActions>
            <div onClick={toggleOpen}>{closeController}</div>
            {actions}
          </MUIDialogActions>
        )}
      </MUIDialog>
    </ThemeProvider>
  );
};

export default Dialog;
