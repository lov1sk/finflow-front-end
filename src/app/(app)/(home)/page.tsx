import { Box, Typography } from "@mui/material";
import { Card } from "./components/card";
import Grid from "@mui/material/Grid2";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import { SearchTransactionsInput } from "./components/transaction/search-transactions-input";
import { TransactionTable } from "./components/transaction/transactions-table";
import { getTransactions } from "@/http/transactions/get-transactions";

interface HomePageProps {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}

export const revalidate = 100;
export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const { data, error, success, errorMessage } = await getTransactions({
    page: searchParams?.page,
    limit: 10,
    description: searchParams?.query,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "40px",
        gap: "40px",
      }}
    >
      <Box>
        {/**Header Cards */}
        <Grid
          container
          spacing={8}
          sx={{
            marginTop: "40px",
          }}
        >
          <Card
            title="Entradas"
            value={data?.creditTransactionsAmount}
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
            value={data?.debitTransactionsAmount}
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
            value={data?.transactionsAmount}
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
      <TransactionTable
        transactions={data?.data ?? []}
        lastPage={data?.lastPage ?? 1}
        page={data?.page ?? 1}
      />
    </Box>
  );
}
