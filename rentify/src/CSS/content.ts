import { createStyles } from "../helpers";
import { grey, main, mainRGB } from "./colors";

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
    py: 1.2,
    bgcolor: "#fff",
    zIndex: 1000,
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
    flexDirection: { xs: "column", lg: "row" },
    gap: { xs: 0, lg: 1 },
    alignItems: { xs: "flex-start", lg: "center" },
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
    flexDirection: { xs: "column", md: "row" },
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
    p: 0,
    "&& .Mui-selected": {
      backgroundColor: main,
      color: "#fff",
    },
  },
  noDataBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "15%",
    borderTop: `1.5px solid ${grey.l1}`,
    flex: 1,
    gap: 2,
  },
  noDataIcon: {
    fontSize: "50px",
    color: main,
  },
  noDataTxt: {
    fontWeight: "bold",
    fontSize: "12px",
    color: "grey",
    textAlign: "center",
  },
});

export const propCardStyles = createStyles({
  gridContainer: {
    overflow: "scroll",
    px: 1.8,
    py: 1.5,
  },
  cardStyles: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    border: "1px solid lightgrey",
    "&:Hover": {
      transform: "scale(1.005)",
      boxShadow: `0px 0px 10px 0px lightgrey`,
    },
    borderRadius: "12px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    p: "12px",
    gap: 1,
  },
  header: {
    display: "flex",
    position: "relative",
    m: "12px 12px 0px 12px",
  },
  actionsBox: {
    display: "flex",
    position: "absolute",
    bottom: 10,
    right: 10,
    gap: 1,
  },
  img: {
    width: "100%",
    height: "150px",
    borderRadius: "12px",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iButton: {
    p: "2px 8px",
    m: 0,
    color: "#118f34",
    textTransform: "none",
    borderRadius: "50px",
    border: "0.5px solid green",
    fontSize: "10px",
    "&:Hover": {
      bgcolor: "#cbf5d7",
    },
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
  propActions: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },
  addToButton: { p: 0 },
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
  footer: {
    display: "flex",
    gap: 1,
  },
  likeButton: {
    color: "lightgray",
    border: "1px solid lightgrey",
    "&:Hover": {
      borderColor: "deeppink",
      color: "deeppink",
    },
  },
  likedButton: {
    color: "deeppink",
    borderColor: "deeppink",
    "&:Hover": {
      bgcolor: "#fff",
      borderColor: "lightgrey",
      color: "lightgrey",
    },
  },
  actionIcon: {
    fontSize: "18px",
    color: "inherit",
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
  editButton: {
    color: main,
    border: "1px solid #fff",
    borderColor: main,
    "&:Hover": {
      borderColor: main,
      bgcolor: main,
      color: "#fff",
    },
  },
  delButton: {
    color: "error.light",
    border: "1px solid #fff",
    borderColor: "error.light",
    "&:Hover": {
      bgcolor: "error.light",
      color: "#fff",
    },
    "&:disabled": {
      borderColor: "lightgrey",
      bgcolor: "grey",
      color: "#fff",
    },
  },
});
