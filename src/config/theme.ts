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
    MuiPagination: {
      styleOverrides: {
        root: {
          // Estilos gerais do componente Pagination
        },
        // Aplica cor à página ativa
        ul: {
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#015F43", // Cor de fundo verde para página ativa
            color: "#fff", // Cor do texto para contraste
            "&:hover": {
              backgroundColor: "#014732", // Cor mais escura ao passar o mouse
            },
          },
        },
      },
    },
  },
});
