import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { authLayout } from "../CSS/auth";
import { isEmpty, singleNestedCopy } from "../helpers";
import { useAppDispatch } from "../Redux/hooks";
import { setEnableLogin } from "../Redux/Slices/appslice";
import { gridStyles } from "../CSS/content";
import { styles } from "../CSS/addProp";

interface fieldProps {
  label: string;
  type: "text" | "email" | "number" | "password";
  value: string | number;
  invalid: boolean;
  validator?: (val: string) => boolean;
}

const textPropFields: fieldProps[] = [
  {
    label: "Property Name",
    type: "text",
    value: "",
    invalid: false,
  },
  {
    label: "Price",
    type: "number",
    value: 0,
    invalid: false,
  },
  {
    label: "Place",
    type: "text",
    value: "",
    invalid: false,
  },
  {
    label: "Street",
    type: "text",
    value: "",
    invalid: false,
  },
  {
    label: "Bed Rooms",
    type: "number",
    value: 0,
    invalid: false,
  },
  {
    label: "Bath rooms",
    type: "number",
    value: 0,
    invalid: false,
  },
];

const selectPropFields = [
  {
    label: "Location",
    type: "number",
    value: "",
    invalid: false,
    options: [],
  },
  {
    label: "Category",
    type: "number",
    value: "",
    invalid: false,
    options: [],
  },
];

export const AddProperty = () => {
  const dispatch = useAppDispatch();
  const [textFields, setTextFields] =
    React.useState<fieldProps[]>(textPropFields);
  const [selectFields, setSelectFields] = React.useState(selectPropFields);

  const [formInvalid, setFormInvalid] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const updateState = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTextFields((prev) => {
      const newState = singleNestedCopy(prev);
      newState[index].value = e.target.value;
      return newState;
    });
  };

  const updateSelectFormState = (
    index: number,
    e: SelectChangeEvent<string>
  ) => {
    setSelectFields((prev) => {
      const newState = singleNestedCopy(prev);
      newState[index].value = e.target.value;
      return newState;
    });
  };
  //   const runValidations = () => {
  //     let valid = true;
  //     const formData: { [key: string]: string } = {};
  //     const newState = formState.map((field) => {
  //       const updatedField = { ...field };

  //       if (field.value == "") {
  //         updatedField.invalid = true;
  //       } else if (field.validator) {
  //         updatedField.invalid = !field.validator(field.value);
  //       }
  //       if (valid) {
  //         valid = !updatedField.invalid;
  //       }
  //       formData[field.label.toLowerCase()] = updatedField.value;
  //       return updatedField;
  //     });
  //     return { valid, newState, formData };
  //   };

  //   const onSubmit = async () => {
  //     setloading(true);
  //     const { valid, newState, formData } = runValidations();
  //     if (valid) {
  //       setFormState(propFields);
  //       setFormInvalid(false);
  //       closeDialog();
  //       console.log({ formData });
  //     } else {
  //       setFormState(newState);
  //       setFormInvalid(true);
  //     }
  //     setloading(false);
  //   };

  const closeDialog = () => {
    dispatch(setEnableLogin({ enable: false }));
  };

  const submitDisabled = React.useMemo(() => {
    for (const field of textFields) {
      if (isEmpty(field.value)) {
        return true;
      }
    }
    for (const field of selectFields) {
      if (isEmpty(field.value)) {
        return true;
      }
    }
    return false;
  }, [textFields, selectFields]);

  //   React.useEffect(() => {
  //     if (!loginMode) {
  //       setFormState(signinFields.concat(signupFields));
  //     } else {
  //       setFormState(signinFields);
  //     }
  //     setFormInvalid(false);
  //   }, [loginMode]);

  if (loading) {
    return (
      <Card
        elevation={24}
        sx={{ ...authLayout.container, ...authLayout.loadingContainer }}
      >
        <CircularProgress sx={authLayout.loader} />
        <Typography sx={authLayout.loadingText}>
          Creating a new property...
        </Typography>
      </Card>
    );
  }
  return (
    <Card elevation={24} sx={authLayout.container}>
      <Typography sx={authLayout.formTitle}>Add a new property</Typography>

      <IconButton sx={authLayout.closeButton} onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
      {formInvalid && (
        <Typography sx={authLayout.errorText}>
          Please fix the following error(s)
        </Typography>
      )}
      <Box sx={authLayout.formContainer}>
        {textFields.map((form, key) => (
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
      <Box sx={authLayout.formContainer}>
        {selectFields.map((form, key) => (
          <Box sx={authLayout.fieldBox} key={`form-field-${key}`}>
            <Typography sx={authLayout.fieldLabel}>{form.label}</Typography>
            <Select
              sx={styles.selectStyles}
              size="small"
              value={form.value}
              displayEmpty
              onChange={(e) => updateSelectFormState(1, e)}
              renderValue={(val) => form.value || val || form.label}
              MenuProps={{
                sx: gridStyles.menuSelect,
              }}
            >
              {form.options.map((option) => (
                <MenuItem sx={gridStyles.menuItem} key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
      {!submitDisabled && (
        <Button
          disabled={submitDisabled}
          fullWidth
          sx={authLayout.submitButton}
          onClick={() => null}
        >
          Submit
        </Button>
      )}
    </Card>
  );
};
