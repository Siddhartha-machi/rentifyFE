import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { authLayout } from "../CSS/auth";
import {
  checkPasswordStrength,
  isEmpty,
  singleNestedCopy,
  validateEmail,
} from "../helpers";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { loadUser, setEnableLogin } from "../Redux/Slices/appslice";
import { APIRequest } from "../API/requests";
import { toast } from "react-toastify";

interface fieldProps {
  label: string;
  type: "text" | "email" | "tel" | "password";
  value: string;
  invalid: boolean;
  validator?: (val: string) => boolean;
}

const signinFields: fieldProps[] = [
  {
    label: "Email",
    type: "email",
    value: "",
    invalid: false,
    validator: validateEmail,
  },
  {
    label: "Password",
    type: "password",
    value: "",
    invalid: false,
    validator: checkPasswordStrength,
  },
];

const signupFields: fieldProps[] = [
  {
    label: "First name",
    type: "text",
    value: "",
    invalid: false,
  },
  {
    label: "Last name",
    type: "text",
    value: "",
    invalid: false,
  },
  {
    label: "Contact",
    type: "tel",
    value: "",
    invalid: false,
  },
];

export const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((store) => store.app);
  const [formState, setFormState] = React.useState<fieldProps[]>([]);
  const [loginMode, setLoginMode] = React.useState(true);
  const [error, setError] = React.useState("");

  const [formInvalid, setFormInvalid] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const updateState = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormState((prev) => {
      const newState = singleNestedCopy(prev);
      newState[index].value = e.target.value;
      return newState;
    });
  };

  const changeMode = () => setLoginMode((prev) => !prev);

  const runValidations = () => {
    let valid = true;
    const formData: { [key: string]: string } = {};
    const newState = formState.map((field) => {
      const updatedField = { ...field };

      if (field.value == "") {
        updatedField.invalid = true;
      } else if (field.validator) {
        updatedField.invalid = !field.validator(field.value);
      }
      if (valid) {
        valid = !updatedField.invalid;
      }

      formData[field.label.toLowerCase().replace(" ", "_")] =
        updatedField.value;

      return updatedField;
    });
    return { valid, newState, formData };
  };

  const onSubmit = async () => {
    setloading(true);
    const { valid, newState, formData } = runValidations();
    if (valid) {
      const req = new APIRequest();
      const res = await req.auth(formData, loginMode);

      if (res?.status === 200) {
        dispatch(loadUser(res.data));
        setLoginMode(true);
        toast.success(`Signed ${loginMode ? "in" : "up"} successfully!`);
        setFormState(singleNestedCopy(signinFields));
        closeDialog();
      }
      setError(`Unable to ${loginMode ? "signin" : "signup"}!`);
      setFormInvalid(isEmpty(res));
    } else {
      setFormState(newState);
      setFormInvalid(true);
    }
    setloading(false);
  };

  const closeDialog = () => {
    dispatch(setEnableLogin({ enable: false }));
  };

  const submitDisabled = React.useMemo(() => {
    for (const field of formState) {
      if (field.value === "") {
        return true;
      }
    }
    return false;
  }, [formState]);

  React.useEffect(() => {
    if (!loginMode) {
      setFormState(signinFields.concat(signupFields));
    } else {
      setFormState(signinFields);
    }
    setFormInvalid(false);
  }, [loginMode]);

  if (loading) {
    return (
      <Card
        elevation={24}
        sx={{ ...authLayout.container, ...authLayout.loadingContainer }}
      >
        <CircularProgress sx={authLayout.loader} />
        <Typography sx={authLayout.loadingText}>
          {loginMode ? "Logging in..." : "Signing up..."}
        </Typography>
      </Card>
    );
  }
  return (
    <Card elevation={24} sx={authLayout.container}>
      <Typography sx={authLayout.formTitle}>Signin to Rentify</Typography>

      {appState.loginReason != "" && (
        <Typography sx={authLayout.formMessage}>
          {appState.loginReason}
        </Typography>
      )}

      <IconButton sx={authLayout.closeButton} onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
      {formInvalid && (
        <Typography sx={authLayout.errorText}>
          {error ? error : "Please fix the following error(s)"}
        </Typography>
      )}
      <Box sx={authLayout.formContainer}>
        {formState.map((form, key) => (
          <Box sx={authLayout.fieldBox} key={`form-field-${key}`}>
            <Typography sx={authLayout.fieldLabel}>{form.label}</Typography>
            <InputBase
              error={form.invalid}
              type={form.type}
              value={form.value}
              sx={authLayout.inputField}
              onChange={(e) => updateState(key, e)}
              placeholder={form.label}
            />
          </Box>
        ))}
      </Box>
      <Typography sx={authLayout.messageText}>
        Don't have an account?
        <Button
          disableTouchRipple
          sx={authLayout.inlineButton}
          onClick={changeMode}
        >
          {loginMode ? "Signup" : "Signin"} here.
        </Button>
      </Typography>
      {!submitDisabled && (
        <Button
          disabled={submitDisabled}
          fullWidth
          sx={authLayout.submitButton}
          onClick={onSubmit}
        >
          {loginMode ? "Signin" : "Signup"}
        </Button>
      )}
    </Card>
  );
};
