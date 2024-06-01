import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputBase,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { filterStyles } from "../CSS/filters";
import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  setBySeller,
  setCurrAmen,
  setCurrCat,
  setCurrRange,
} from "../Redux/Slices/appslice";

import { int, lstConcat, min } from "../helpers";
import { useSearchParams } from "react-router-dom";

const valueText = (val: number) => `$ ${val}`;

const Filters = () => {
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const { filters, user } = useAppSelector((store) => store.app);

  const { categories, priceRange, amenities } = filters;

  // URL Query parameters update handlers
  const updateQueryParams = (key: string, val: string) => {
    if (val) {
      queryParams.set(key, val);
      setQueryParams(queryParams);
    } else {
      removeQueryParams(key);
    }
  };
  const removeQueryParams = (key: string) => {
    queryParams.delete(key);
    setQueryParams(queryParams);
  };
  const applyFiltersHandler = () => {
    const newAmens: Array<number> = [];
    amenities.forEach((item) => {
      if (item.checked) newAmens.push(item.id);
    });

    const newCats: Array<number> = [];
    categories.forEach((item) => {
      if (item.checked) newCats.push(item.id);
    });

    if (filters.bySeller) {
      updateQueryParams("byseller", `${user.id}`);
    } else {
      removeQueryParams("byseller");
    }
    updateQueryParams("price", lstConcat(priceRange));
    updateQueryParams("amenities", lstConcat(newAmens));
    updateQueryParams("categories", lstConcat(newCats));
  };
  // Global State update handlers
  const updateCategory = (index: number) => {
    dispatch(setCurrCat({ index }));
  };
  const updateAmenity = (index: number) => {
    dispatch(setCurrAmen({ index }));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateRange = (e: any) => {
    dispatch(setCurrRange(int(e.target.value)));
  };
  const applySellerFilter = () => {
    dispatch(setBySeller(!filters.bySeller));
  };
  const updateRangeWithTextBox = (
    minF: boolean,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newState = [...priceRange];
    if (minF) {
      newState[0] = min(e.target.value, 10_000);
    } else {
      newState[1] = min(e.target.value, 10_000);
    }
    dispatch(setCurrRange(newState));
  };

  // Component Definition
  return (
    <Stack sx={filterStyles.container} divider={<Divider />}>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>Category</Typography>
        {categories.map((category, index) => (
          <FormControlLabel
            label={category.name}
            key={category.id}
            control={
              <Checkbox
                name="category"
                disableTouchRipple
                size="small"
                sx={filterStyles.checkBox}
                checked={category.checked}
                onChange={() => updateCategory(index)}
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
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={updateRange}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            sx={filterStyles.slider}
            min={1}
            max={10_000}
            name="price"
          />
        </Box>
        <Box sx={filterStyles.range}>
          <InputBase
            placeholder="Minimum"
            value={priceRange[0]}
            onChange={(e) => updateRangeWithTextBox(true, e)}
            sx={filterStyles.rangeField}
          />
          <InputBase
            placeholder="Maximum"
            value={priceRange[1]}
            onChange={(e) => updateRangeWithTextBox(false, e)}
            sx={filterStyles.rangeField}
          />
        </Box>
      </Box>
      <Box sx={filterStyles.catBox}>
        <Typography sx={filterStyles.filterSubTitle}>Amenities</Typography>
        {amenities.map((amenity, index) => (
          <FormControlLabel
            label={amenity.name}
            key={amenity.id}
            control={
              <Checkbox
                disableTouchRipple
                size="small"
                sx={filterStyles.checkBox}
                checked={amenity.checked}
                onChange={() => updateAmenity(index)}
              />
            }
          />
        ))}
      </Box>
      {user.role === "seller" && (
        <Box sx={filterStyles.catBox}>
          <Typography sx={filterStyles.filterSubTitle}>
            Seller Filter
          </Typography>
          <FormControlLabel
            label={"Include only my properties"}
            key={"self-prop-list"}
            control={
              <Checkbox
                disableTouchRipple
                size="small"
                sx={filterStyles.checkBox}
                checked={filters.bySeller}
                onChange={applySellerFilter}
              />
            }
          />
        </Box>
      )}
      <Button
        fullWidth
        onClick={applyFiltersHandler}
        sx={filterStyles.applyButton}
      >
        Apply Filters
      </Button>
    </Stack>
  );
};

export default Filters;
