import { createStyles } from "../helpers";
import { main, mainRGB } from "./colors";

export const authLayout = createStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    minHeight: 200,
    borderRadius: "12px",
    px: "20px",
    pt: "10px",
    pb: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  fieldBox: {
    display: "flex",
    flexDirection: "column",
    gap: 0.3,
  },
  fieldLabel: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  inputField: {
    border: `2px solid rgba(${mainRGB}, 0.3)`,
    "&.Mui-focused": {
      boxShadow: `0 0 6px 0 ${main}`,
      borderColor: main,
    },
    "&.Mui-error": {
      border: "1px solid transparent",
      borderColor: "error.light",
      boxShadow: "0 0 6px 0 red",
    },
    borderRadius: "6px",
    pl: 1,
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    pb: 1,
  },
  formMessage: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    pb: 1,
  },
  submitButton: {
    color: "#fff",
    textTransform: "none",
    mt: 2,
    bgcolor: main,
    "&:Hover": {
      bgcolor: main,
      fontWeight: "bold",
    },
  },
  errorText: {
    fontSize: "14px",
    color: "error.light",
    textAlign: "center",
    pb: 1,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: "10px",
    textAlign: "center",
    pt: 1.5,
  },
  inlineButton: {
    p: 0,
    ml: 0.8,
    fontSize: "10px",
    textTransform: "none",
    fontWeight: "bold",
    color: main,
    "&:Hover": {
      bgcolor: "transparent",
    },
  },
  loadingText: {
    fontWeight: "bold",
  },
  loader: {
    color: main,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    color: main,
    position: "absolute",
    right: 10,
    top: 10,
    "&:Hover": {
      bgcolor: "transparent",
    },
  },
});
