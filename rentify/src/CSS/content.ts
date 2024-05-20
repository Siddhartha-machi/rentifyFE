import { createStyles } from "../helpers";
import { main, mainRGB } from "./colors";

export const gridStyles = createStyles({
  PropGridContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  gridHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    px: 1.8,
    pt: 1.2,
    bgcolor: "#fff",
  },
  availableLoc: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  message: {
    fontSize: "16px",
    fontWeight: "light",
  },
  headerInnerLeft: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  availCount: {
    fontSize: "12px",
    color: "grey",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  sortByContainer: {
    display: "flex",
    gap: 1,
  },
  sortby: {
    width: "120px",
    boxShadow: "none",
    borderRadius: "10px",
    color: main,
    fontSize: "12px",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: main,
    },
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: main,
    },
    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: main,
    },
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: `rgba(${mainRGB}, 0.3)`,
        color: "white",
        border: `1px solid rgba(${mainRGB}, 0.8)`,
      },
    },
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
  menuSelect: {
    mt: 1,
    "&& .Mui-selected": {
      backgroundColor: main,
      color: "#fff",
    },
  },
});

export const propCardStyles = createStyles({
  gridContainer: {
    overflow: "scroll",
    px: 1.8,
    pb: 1.5,
    pt: 1.2,
  },
  cardStyles: {
    borderRadius: "8px",
    "&:Hover": {
      transform: "scale(1.005)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    p: 1.5,
    gap: 1,
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iButton: {
    p: "0px 6px",
    m: 0,
    bgcolor: "#cbf5d7",
    color: "#118f34",
    textTransform: "none",
    borderRadius: "50px",
    border: "0.5px solid green",
    fontSize: "10px",
  },
  priceBox: {
    display: "flex",
    gap: 0.5,
    alignItems: "center",
  },
  propPrice: {
    fontSize: "16px",
    color: main,
  },
  priceRight: {
    fontSize: "12px",
    color: "grey",
  },
  propName: {
    fontWeight: "bold",
    fontSize: "15px",
    pl: 0.5,
  },
  address: {
    fontSize: "12px",
    color: "grey",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    pb: 0.2,
    mx: 1,
  },
  metaItem: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  metaItemIcon: {
    fontSize: "18px",
    color: main,
  },
  metaItemText: {
    fontSize: "12px",
  },
  sellerButton: {
    bgcolor: main,
    color: "#fff",
    textTransform: "none",
    borderRadius: "10px",
    fontSize: "12px",
    "&:Hover": {
      bgcolor: main,
      fontWeight: "bold",
    },
  },
});
