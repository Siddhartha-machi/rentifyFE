import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Slider,
  Typography,
} from "@mui/material";
import { filterStyles } from "../CSS/filters";
import React from "react";

const categories: { [key: string]: boolean } = {
  Appartments: true,
  Houses: false,
  Vila: false,
  Rooms: false,
};

const amenities: { [key: string]: boolean } = {
  Hospital: true,
  School: false,
  "Police Station": false,
  Park: false,
};

const valueText = (val: number) => `$ ${val}`;

const Filters = () => {
  const [category, setcategory] = React.useState(categories);
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const updateCategory = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setcategory((prev) => {
      const newState = { ...prev };
      newState[key] = e.target.checked;
      return newState;
    });
  };

  return (
    <Box sx={filterStyles.container}>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>Category</Typography>
        {Object.keys(category).map((key) => (
          <FormControlLabel
            label={key}
            key={key}
            control={
              <Checkbox
                disableTouchRipple
                size="small"
                sx={filterStyles.checkBox}
                checked={category[key]}
                onChange={(e) => updateCategory(key, e)}
              />
            }
          />
        ))}
      </Box>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>
          Price Range ($)
        </Typography>
        <Box sx={filterStyles.indentBox}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            sx={filterStyles.slider}
          />
        </Box>
        <Box sx={filterStyles.range}>
          <InputBase placeholder="Minimum" sx={filterStyles.rangeField} />
          <InputBase placeholder="Maximum" sx={filterStyles.rangeField} />
        </Box>
      </Box>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>Size (sq)</Typography>
        <Box sx={filterStyles.indentBox}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            sx={filterStyles.slider}
          />
        </Box>
      </Box>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>Amenities</Typography>
        {Object.keys(amenities).map((key) => (
          <FormControlLabel
            label={key}
            key={key}
            control={
              <Checkbox
                disableTouchRipple
                size="small"
                sx={filterStyles.checkBox}
                checked={category[key]}
                onChange={(e) => updateCategory(key, e)}
              />
            }
          />
        ))}
      </Box>

      <Button fullWidth sx={filterStyles.applyButton}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
