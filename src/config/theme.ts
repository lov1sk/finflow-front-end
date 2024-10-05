import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#00875F",
            "&:hover": {
              backgroundColor: "#00875FCC",
              boxShadow: "none",
            },
            color: "#fff",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      ],
    },
  },
});
