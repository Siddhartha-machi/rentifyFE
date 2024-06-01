import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { authLayout } from "../CSS/auth";
import { isEmpty, resolveReq, singleNestedCopy } from "../helpers";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  appendProperty,
  filterItemType,
  setEnablePropAdd,
  updateProperty,
} from "../Redux/Slices/appslice";
import { gridStyles } from "../CSS/content";
import { styles } from "../CSS/addProp";
import { APIRequest } from "../API/requests";
import { toast } from "react-toastify";

interface fieldProps {
  label: string;
  type: "text" | "email" | "number" | "password";
  key?: string;
  value: string | number;
  invalid: boolean;
  validator?: (val: string) => boolean;
}

interface selectFieldProps {
  label: string;
  value: filterItemType | null;
  options: filterItemType[];
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
    key: "bedrooms",
  },
  {
    label: "Bath rooms",
    type: "number",
    value: 0,
    invalid: false,
    key: "baths",
  },
];

const selectPropFields: selectFieldProps[] = [
  {
    label: "Location",
    value: null,
    options: [],
  },
  {
    label: "Category",
    value: null,
    options: [],
  },
  {
    label: "Amenities",
    value: null,
    options: [],
  },
];

export const AddProperty = () => {
  const dispatch = useAppDispatch();
  const { filters, user, propAdd, propData } = useAppSelector(
    (store) => store.app
  );

  const [textFields, setTextFields] = React.useState(textPropFields);
  const [selectFields, setSelectFields] = React.useState(selectPropFields);

  const [formError, setFormError] = React.useState("");
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

  const updateSelectFormState = (fieldIn: number, child: unknown) => {
    setSelectFields((prev) => {
      const key = (child as React.ReactElement).props["sel-index"];
      const newState = singleNestedCopy(prev);
      newState[fieldIn].value = prev[fieldIn].options[key];
      return newState;
    });
  };

  const extractData = () => {
    const formData: {
      [key: string]: string | number | Array<number | string>;
    } = {};
    textFields.forEach((field) => {
      const key = field.key || field.label.toLowerCase().replace(" ", "_");
      formData[key] = field.value;
    });
    selectFields.forEach((field) => {
      const val = field.value?.id || "";
      if (field.label !== "Location") {
        formData[field.label.toLowerCase()] = [val];
      } else {
        formData[field.label.toLowerCase()] = val;
      }
    });

    formData["seller"] = user.id as number;
    return formData;
  };

  const closeDialog = () => {
    setTextFields(singleNestedCopy(textPropFields));
    setSelectFields(singleNestedCopy(selectPropFields));
    dispatch(setEnablePropAdd({ enable: false, context: null }));
    setloading(false);
  };

  const onSubmit = async () => {
    setloading(true);
    const formData = extractData();

    const req = new APIRequest();
    if (propAdd.context !== null) {
      const mObj = { ...propData[propAdd.context], ...formData };
      const res = await req.update(`property-list/${mObj.id}`, mObj);
      const resolution = resolveReq(res);
      setFormError(resolution.error);
      if (resolution.success) {
        dispatch(
          updateProperty({ index: propAdd.context, data: resolution.data })
        );
        toast.success(
          "Successfully updated property ",
          mObj.property_name || ""
        );
        closeDialog();
      } else {
        toast.error(
          `Unable to update property ${
            mObj.property_name || ""
          } try again after sometim.`
        );
      }
    } else {
      const res = await req.post("property-list", formData);
      const resolution = resolveReq(res);
      setFormError(resolution.error);
      if (resolution.success) {
        dispatch(appendProperty(resolution.data));
        toast.success(
          `Successfully created property ${formData.property_name || ""}`
        );
        closeDialog();
      } else {
        toast.error(
          "Unable to create property. Please try again after sometime."
        );
      }
    }

    setloading(false);
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

  const editMode = React.useMemo(
    () => propAdd.context !== null,
    [propAdd.context]
  );

  React.useEffect(() => {
    setSelectFields((prev) => {
      const newState = singleNestedCopy(prev);
      newState[0].options = filters.location.data;
      newState[1].options = filters.categories;
      newState[2].options = filters.amenities;
      return newState;
    });
  }, [filters]);

  React.useEffect(() => {
    if (propAdd.context !== null) {
      const selected = propData[propAdd.context];
      setTextFields((prev) => {
        const newState = singleNestedCopy(prev);
        prev.forEach((field, index) => {
          const key = field.key || field.label.toLowerCase().replace(" ", "_");
          newState[index].value = selected[key];
        });
        return newState;
      });
      setSelectFields((prev) => {
        const newState = singleNestedCopy(prev);
        newState[0].value = filters.location.data.find(
          (item) => item.id === selected["location"]
        );
        newState[1].value = filters.categories.find(
          (item) => item.id === selected["category"][0]
        );
        newState[2].value = filters.amenities.find(
          (item) => item.id === selected["amenities"][0]
        );

        return newState;
      });
    }
  }, [
    filters.amenities,
    filters.categories,
    filters.location.data,
    propAdd.context,
    propData,
  ]);

  if (loading) {
    return (
      <Card
        elevation={24}
        sx={{ ...authLayout.container, ...authLayout.loadingContainer }}
      >
        <CircularProgress sx={authLayout.loader} />
        <Typography sx={authLayout.loadingText}>
          {editMode ? "Fetching property " : "Creating a new "} property...
        </Typography>
      </Card>
    );
  }
  return (
    <Card elevation={24} sx={authLayout.container}>
      <Typography sx={authLayout.formTitle}>
        {editMode ? "Update the property" : "Add a new property"}
      </Typography>

      <IconButton sx={authLayout.closeButton} onClick={closeDialog}>
        <CloseIcon />
      </IconButton>
      {formError && (
        <Typography sx={authLayout.errorText}>{formError}</Typography>
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
              value={form?.value?.name || ""}
              displayEmpty
              onChange={(_, c) => updateSelectFormState(key, c)}
              renderValue={(val) => form?.value?.name || val || form.label}
              MenuProps={{
                sx: gridStyles.menuSelect,
              }}
            >
              {form.options.map((option, opKey) => (
                <MenuItem
                  sx={gridStyles.menuItem}
                  key={`${key}-${opKey}`}
                  sel-index={opKey}
                  value={option.name}
                >
                  {option.name}
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
          onClick={onSubmit}
        >
          {editMode ? "Save updates" : "Submit"}
        </Button>
      )}
    </Card>
  );
};
