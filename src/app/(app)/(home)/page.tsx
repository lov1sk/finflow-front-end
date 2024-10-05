import { Box } from "@mui/material";
import { Card } from "./components/card";
import Grid from "@mui/material/Grid2";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import { SearchTransactionsInput } from "./components/search-transactions-input";

export default function HomePage() {
  const username = "Lucas Ribeiro";
  const entryBalance = 17400;
  const outingBalance = 1259;
  const balance = 16141;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Box>
        {/**Header Cards */}
        <Grid
          container
          spacing={4}
          sx={{
            marginTop: "40px",
          }}
        >
          <Card
            title="Entradas"
            value={entryBalance}
            icon={
              <ArrowUpCircle
                style={{
                  color: "#00B37E",
                }}
              />
            }
          />
          <Card
            title="Saídas"
            value={outingBalance}
            icon={
              <ArrowDownCircle
                style={{
                  color: "#F75A68",
                }}
              />
            }
          />
          <Card
            title="Saldo"
            value={balance}
            variant="green-filled"
            icon={
              <DollarSign
                style={{
                  color: "#FFFFFF",
                }}
              />
            }
          />
        </Grid>
      </Box>
      <SearchTransactionsInput />
    </Box>
  );
}
