import { createStyles } from "../helpers";
import { grey, main } from "./colors";

export const filterStyles = createStyles({
  container: {
    width: "230px",
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    borderRight: `2px solid ${grey.l1}`,
    position: "sticky",
    top: 75,
    maxHeight: "100vh",
    pr: 1,
    gap: 1.5,
  },
  filterSubTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    bgcolor: "#fff",
    py: 0.8,
    zIndex: 1000,
  },
  catBox: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    maxHeight: "200px",
    overflow: "scroll",
  },
  indentBox: {
    display: "flex",
    flexDirection: "column",
    px: 3,
  },
  checkBox: {
    color: main,
    py: 0,
    "&.Mui-checked": {
      color: main,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 18,
    },
    "&:Hover": {
      bgcolor: "#fff",
    },
  },
  slider: {
    color: main,
    zIndex: 1000,
    height: 8,
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 10,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      fontWeight: "bold",
      borderRadius: "50% 50% 50% 0",
      backgroundColor: main,
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  },
  range: {
    display: "flex",
    gap: 1,
    mb: 0.5,
    mr: 1,
  },
  rangeField: {
    border: `2px solid ${grey.l1}`,
    borderRadius: "6px",
    pl: 1,
  },
  applyButton: {
    color: "#fff",
    bgcolor: main,
    mt: 0.5,
    "&:Hover": {
      bgcolor: main,
      fontWeight: "bold",
    },
  },
});
