import React from 'react';
// import * as Sentry from '@sentry/browser';
import Banner from '../banner';

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
        <Banner
          title="Sorry, results couldn't be loaded"
          type="critical"
          message={message}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
