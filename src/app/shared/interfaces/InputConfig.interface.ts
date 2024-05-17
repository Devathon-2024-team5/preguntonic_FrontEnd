import { InputType } from "../types/input.type";

export interface IInputConfig {
  placeholder: string;
  name: string;
  value: string;
  type?: InputType;
  maxletngth?: number;
  classList?: Record<string, boolean>;
}