import { InputType } from "../types/input.type";

export interface IInputConfig {
  placeholder: string;
  name: string;
  value: string;
  hasValidationError?: boolean;
  id?: string;
  type?: InputType;
  maxletngth?: number;
}