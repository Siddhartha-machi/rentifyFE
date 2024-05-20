import { createStyles } from "../helpers";
import { main, mainRGB } from "./colors";

export const styles = createStyles({
  selectStyles: {
    borderRadius: "6px",
    color: main,
    fontSize: "12px",
    ".MuiOutlinedInput-notchedOutline": {
      border: `2px solid rgba(${mainRGB}, 0.3)`,
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid rgba(${mainRGB}, 0.3)`,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid rgba(${mainRGB}, 0.3)`,
      boxShadow: `0 0 6px 0 ${main}`,
    },
  },
});
