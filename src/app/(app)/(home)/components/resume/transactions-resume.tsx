import { Box } from "@mui/material";
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";
import { Card } from "../card";

interface TransactionsResumeProps {
  creditTransactionsAmount?: number;
  debitTransactionsAmount?: number;
  transactionsAmount?: number;
}
export function TransactionsResume({
  creditTransactionsAmount,
  debitTransactionsAmount,
  transactionsAmount,
}: TransactionsResumeProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        overflowX: "scroll",
        gap: "32px",
        marginTop: "40px",
      }}
    >
      <Card
        title="Entradas"
        value={creditTransactionsAmount}
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
        value={debitTransactionsAmount}
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
        value={transactionsAmount}
        variant="green-filled"
        icon={
          <DollarSign
            style={{
              color: "#FFFFFF",
            }}
          />
        }
      />
    </Box>
  );
}
