import React, { useContext, useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AppContext } from 'app/AppContext';

type Props = {
  children: React.ReactNode;
};

const ActionFeedbackBoundary: React.FC<Props> = ({ children }) => {
  const { actionFeedback, setActionFeedback } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);

  const cleanActionFeedback = () => {
    setOpen(false);
    setTimeout(() => setActionFeedback(null), 1000); // Hack: Cleaning data after fadeout animation of snackbar
  };

  useEffect(() => setOpen(!!actionFeedback), [actionFeedback]);

  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={9000}
        onClose={cleanActionFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={cleanActionFeedback}
          severity={actionFeedback?.severity}
          elevation={6}
          variant="filled"
        >
          {actionFeedback?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ActionFeedbackBoundary;
