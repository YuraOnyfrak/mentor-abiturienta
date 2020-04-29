import { ValidationState } from './enum/validation-state.enum';

export class ValidationResult {
    public status: ValidationState = ValidationState.Success;
    public message: string = "";
  }