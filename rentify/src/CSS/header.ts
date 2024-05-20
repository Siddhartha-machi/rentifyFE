import { createStyles } from "../helpers";
import { grey, main, mainRGB } from "./colors";

export const searchStyles = createStyles({
  container: {
    display: "flex",
    alignItems: "center",
    borderRadius: "50px",
    gap: 1,
    pr: 0.2,
    border: `1px solid grey`,
  },
  textBox: {
    py: 0.4,
    px: 2,
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "50px",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
  icon: {
    fontSize: "18px",
    mr: 1,
  },
  select: {
    width: "150px",
    my: 0.5,
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "12px",
    fontWeight: "bold",
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
  profileIcon: {
    display: "flex",
    textTransform: "none",
    "&:Hover": {
      bgcolor: "transparent",
    },
  },
  userDetail: {
    display: "flex",
    flexDirection: "column",
    px: 1.5,
    textAlign: "left",
  },
  username: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#000",
  },
  role: {
    fontSize: "10px",
    mt: "-3px",
    color: "grey",
  },
  avatar: {
    bgcolor: "#118f34",
    width: 42,
    height: 42,
  },
  menuItem: {
    display: "flex",
    fontSize: "12px",
    justifyContent: "center",
    m: 1,
    borderRadius: "5px",
    "&:Hover": {
      backgroundColor: main,
      color: "#fff",
    },
    ".MuiSelect-select": {
      backgroundColor: main,
      color: "#fff",
    },
  },
});

export const headerStyles = createStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1.5px solid ${grey.l1}`,
    p: "12px",
    position: "sticky",
    top: 0,
    bgcolor: "#fff",
    zIndex: 1000,
  },
  menuContainer: {
    width: "180px",
    p: 0,
  },
  menuItem: {
    display: "flex",
    fontSize: "12px",
    justifyContent: "center",
    m: 1,
    borderRadius: "5px",
    bgcolor: `rgba(${mainRGB}, 0.1)`,
    border: `1px solid rgba(${mainRGB}, 0.6)`,
    "&:Hover": {
      bgcolor: main,
      color: "#fff",
    },
  },
});
