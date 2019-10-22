import React from 'react';
import { withFormsy } from 'formsy-react';
import Recaptcha from 'react-google-recaptcha';
import { WithFormsyProps } from 'common/types/formsy';

class RecaptchaFormsy extends React.Component<WithFormsyProps> {
  constructor(props: WithFormsyProps) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(captcha: string | null) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(captcha);
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();

    return (
      <div>
        <Recaptcha
          sitekey="6LdrLb0UAAAAAH6J74vpjsjlTt9ueSooIXTWuJPv"
          onChange={this.changeValue}
        />
        <span>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(RecaptchaFormsy);
