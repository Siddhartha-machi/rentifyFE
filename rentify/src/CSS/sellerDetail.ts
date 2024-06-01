import { createStyles } from "../helpers";

export const sDetail = createStyles({
  closeIcon: {
    position: "absolute",
    right: 6,
    top: 6,
    p: 0.5,
    "&:Hover": {
      bgcolor: "#fff",
    },
  },
  sectionBox: {
    display: "flex",
    flexDirection: "column",
    gap: 1.8,
    py: 1.8,
  },
  itemBox: {
    display: "flex",
    alignItems: "center",
    gap: 1.2,
  },
  itemLabel: {
    fontSize: "13px",
  },
  errorTxt: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "error.light",
  },
});
