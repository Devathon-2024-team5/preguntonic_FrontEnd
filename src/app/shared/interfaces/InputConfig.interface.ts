import { InputType } from "../types/input.type";

export interface IInputConfig {
  placeholder: string;
  name: string;
  type?: InputType;
  maxletngth?: number;
  class?: string[]
}