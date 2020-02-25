import React from 'react';
// import * as Sentry from '@sentry/browser';
import { Alert, AlertTitle } from '@material-ui/lab';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

type ErrorInfo = {
  componentStack: string;
};

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    // Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      const message = `There was an error while processing your request. Refresh your
        page for loading results.`;
      return (
        <Alert severity="error">
          <AlertTitle>Sorry, results couldn't be loaded</AlertTitle>
          {message}
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
