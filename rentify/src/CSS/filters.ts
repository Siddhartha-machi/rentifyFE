import { createStyles } from "../helpers";
import { grey, main } from "./colors";

export const filterStyles = createStyles({
  container: {
    width: "230px",
    display: "flex",
    flexDirection: "column",
    borderRight: `2px solid ${grey.l1}`,
    position: "sticky",
    top: 75,
    maxHeight: "100vh",
    pr: 1,
  },
  filterSubTitle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  catBox: {
    display: "flex",
    flexDirection: "column",
    py: 1.5,
    gap: 1,
    borderBottom: `1px solid ${grey.l2}`,
  },
  indentBox: {
    display: "flex",
    flexDirection: "column",
    px: 3,
    gap: 1,
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
    mt: 2,
    bgcolor: main,
    "&:Hover": {
      bgcolor: main,
      fontWeight: "bold",
    },
  },
});
