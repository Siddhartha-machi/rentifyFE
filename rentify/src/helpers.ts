import { SxProps } from "@mui/material";

export function createStyles<T extends Record<string, SxProps>>(styles: T) {
  return styles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleNestedCopy = (original: any[]) => {
  return original.map((obj) => ({ ...obj }));
};

export const validateEmail = (email: string) => {
  const valid = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;

  return valid;
};

export const checkPasswordStrength = (password: string) => {
  let valid = true;
  if (password.length < 8) {
    valid = false;
  }
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }

  valid = strength === 4 && valid ? true : false;

  return valid;
};

export const isEmpty = (val: unknown) => {
  if (typeof val === "string") {
    return val === "";
  }
  if (typeof val === "number") {
    return val === 0;
  }
};
