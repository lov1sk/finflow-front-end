import { Box, Typography } from "@mui/material";
import { Card } from "./components/card";
import Grid from "@mui/material/Grid2";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";
import { SearchTransactionsInput } from "./components/transaction/search-transactions-input";
import { TransactionTable } from "./components/transaction/transactions-table";
import { getTransactions } from "@/http/transactions/get-transactions";
import { TransactionsResume } from "./components/resume/transactions-resume";

interface HomePageProps {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}

export const revalidate = 100;
export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const { data, error, errorMessage } = await getTransactions({
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
      <TransactionsResume
        creditTransactionsAmount={data?.creditTransactionsAmount}
        debitTransactionsAmount={data?.debitTransactionsAmount}
        transactionsAmount={data?.transactionsAmount}
      />

      <SearchTransactionsInput />

      <TransactionTable
        transactions={data?.data ?? []}
        lastPage={data?.lastPage ?? 1}
        page={data?.page ?? 1}
        error={error}
        errorMessage={errorMessage}
      />
    </Box>
  );
}
