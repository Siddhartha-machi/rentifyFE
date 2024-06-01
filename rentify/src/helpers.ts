/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from "@mui/material";
import emailJs from "@emailjs/browser";
import { UserType } from "./Redux/Slices/appslice";

export function createStyles<T extends Record<string, SxProps>>(styles: T) {
  return styles;
}

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
  if (!val) {
    return true;
  } else if (typeof val === "string") {
    return val === "";
  } else if (typeof val === "number") {
    return val === 0;
  } else if (typeof val === "object") {
    return Object.keys(val).length === 0;
  }
  if (!val) {
    return false;
  }
  return true;
};

export const min = (val1: number | string, val2: number | string) => {
  const v1 = parseInt(val1 as string);
  const v2 = parseInt(val2 as string);

  if (v1 < v2) {
    return v1;
  }
  return v2;
};

export const max = (val1: number | string, val2: number | string) => {
  const v1 = parseInt(val1 as string);
  const v2 = parseInt(val2 as string);

  if (v1 < v2) {
    return v1;
  }
  return v2;
};

export const lstConcat = (lst: Array<string | number>) => {
  let str = "";
  for (const val of lst) {
    str = str + "," + String(val);
  }

  return str.slice(1);
};

export const str = (val: number | null | undefined) => {
  return String(val) || "";
};

export const int = (lst: Array<string>) => {
  return lst.map((item) => parseInt(item));
};

export const capFirst = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const resolveReq = (res: any) => {
  const result: any = {
    data: null,
    error: "Unknown error occured, please try again later",
    success: false,
  };
  if (res?.status >= 200 && res?.status < 300) {
    result.data = res.data;
    result.error = "";
    result.success = true;
  } else {
    if (res?.data && typeof res?.data === "object") {
      const key = Object.keys(res?.data)[0];
      if (typeof res?.data[key] === "object") {
        result.error = res?.data[key][0] || result.error;
      } else {
        result.error = res?.data[key];
      }
    }
  }
  return result;
};

// Mail helper handlers

export const loadCreds = async () => {
  let creds: any = null;

  try {
    const res = await fetch(`./credentials.json`);
    if (res.ok) {
      creds = await res.json();
    }
  } catch {
    creds = null;
  }

  return creds;
};

export const sendMail = async (
  receiver: UserType,
  data: UserType,
  prop_name: string
) => {
  const creds = await loadCreds();
  if (!creds) {
    return { status: 500 };
  }

  const template_params = {
    first_name: receiver.first_name,
    last_name: receiver.last_name,
    email: receiver.email,
    property_name: prop_name,
    seller_name: `${data.first_name} ${data.last_name}`,
    seller_email: data.email,
    seller_contact: data.contact,
  };
  try {
    return await emailJs.send(
      creds.SERVICE_ID,
      creds.TEMPLATE_ID,
      template_params,
      creds.PUBLIC_KEY
    );
  } catch (e: any) {
    return e;
  }
};
