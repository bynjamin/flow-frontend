export interface WithFormsyProps {
  setValue: (value: any) => void;
  getValue: () => any;
  setValidations: (validations: any, required: boolean) => void;
  hasValue: () => boolean;
  isFormDisabled: () => boolean;
  isFormSubmitted: () => boolean;
  isPristine: () => boolean;
  isRequired: () => boolean;
  isValid: () => boolean;
  isValidValue: () => boolean;
  showError: () => boolean;
  showRequired: () => boolean;
  getErrorMessage: () => string;
  getErrorMessages: () => string;
}
