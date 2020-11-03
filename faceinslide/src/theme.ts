import { createMuiTheme } from "@material-ui/core/styles"

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#AA88FF", contrastText: "#FFFFFF" },
    secondary: { main: "#D4C2FF", contrastText: "#FFFFFF" },
    error: { main: "#FF8FA4" },
    background: { default: "#F8F8FB" },
    text: { primary: "#454851", disabled: "#454851", secondary: "#454851" },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiCheckbox: {
      color: "primary",
    },
    MuiRadio: {
      color: "primary",
    },
    MuiSwitch: {
      color: "primary",
    },
  },
  typography: {
    h1: {
      color: "#454851",
      fontSize: 28,
      fontWeight: "bold",
    },
    h2: {
      color: "#454851",
      fontSize: 24,
      fontWeight: "bold",
    },
    h3: {
      color: "#454851",
      fontSize: 24,
      fontWeight: "bold",
    },
    h4: {
      color: "#454851",
      fontSize: 20,
      fontWeight: "bold",
    },
    h5: {
      color: "#454851",
      fontSize: 16,
      fontWeight: "bold",
    },
    h6: {
      color: "#454851",
      fontSize: 16,
    },
    body1: {
      color: "#454851",
      fontSize: 16,
    },
    body2: {
      color: "#454851",
      fontSize: 14,
    },
    subtitle1: {
      color: "#BAC2DA",
      fontSize: 16,
      fontWeight: "bold",
    },
    button: {
      textTransform: "none",
      color: "#FFFFFF",
      fontSize: 16,
    },
    caption: {
      color: "#FF8FA4",
      fontSize: 14,
    },
  },
})
