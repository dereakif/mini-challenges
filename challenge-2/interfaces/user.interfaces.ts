import { ChangeEvent, FormEvent } from "react";

export type UserInfo = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type onChangeFunction = (event: ChangeEvent<HTMLInputElement>) => void;

export type onSubmitFunction = (event: FormEvent<HTMLFormElement>) => void;
