"use client";
import { formatToCurrency } from "@/app/utils/format-to-currency";
import { formatToDate } from "@/app/utils/format-to-date";
import { transactionsTypeMapper } from "@/app/utils/mappers/transactions-type-mapper";
import { TableComponent } from "@/components/table";
import { Transaction, TransactionType } from "@/types/transaction";
import { Box, Modal, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PaginationComponent from "@/components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TransactionDetailsModal } from "./transaction-details-modal";
import { NoTransactionsMessage } from "./no-transactions-message";

interface TransactionTableProps {
  page: number;
  lastPage: number;
  transactions: Transaction[];
  error?: boolean;
  errorMessage?: string;
}
export function TransactionTable({
  transactions,
  lastPage,
  page,
  error,
  errorMessage,
}: TransactionTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionDetailsModalRef = useRef(null);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [removeTransactionModalOpen, setRemoveTransactionModalOpen] =
    useState<boolean>(false);
  const [transactionToRemove, setTransactionToRemove] = useState<
    Transaction | undefined
  >(undefined);

  const handleRemoveTransactionClick = (transaction: Transaction) => {
    setRemoveTransactionModalOpen(true);
    setTransactionToRemove(transaction);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [currentPage]);

  // yyyy-mm-dd
  const tableHeader = (
    <TableRow>
      <TableCell component="th">
        <Typography variant="body1" fontWeight="bold">
          Descrição
        </Typography>
      </TableCell>
      <TableCell component="th">
        <Typography variant="body1" fontWeight="bold">
          Valor R$
        </Typography>
      </TableCell>
      <TableCell component="th">
        <Typography variant="body1" fontWeight="bold">
          Categoria
        </Typography>
      </TableCell>
      <TableCell component="th">
        <Typography variant="body1" fontWeight="bold">
          Data
        </Typography>
      </TableCell>
    </TableRow>
  );
  const tableBody = transactions.map((tx) => (
    <TableRow
      key={tx.idTransaction}
      onClick={() => handleRemoveTransactionClick(tx)}
      sx={{
        backgroundColor: "#27272A",

        "&:hover": {
          backgroundColor: "#242424", // Cor de fundo no hover
          cursor: "pointer", // Alterando o cursor para indicar interatividade
        },
      }}
    >
      <TableCell component="td" sx={{ borderRadius: "8px 0px 0 8px" }}>
        <Typography variant="body1" fontSize={14}>
          {tx.description}
        </Typography>
      </TableCell>
      <TableCell component="td">
        <Typography
          variant="body1"
          fontSize={14}
          fontWeight="bold"
          color={
            tx.typeTransaction === TransactionType.CREDIT
              ? "#00B37E"
              : "#F75A68"
          }
        >
          {formatToCurrency(tx.valueTransaction)}
        </Typography>
      </TableCell>
      <TableCell component="td">
        <Typography variant="body1" fontSize={14}>
          {tx.category}
        </Typography>
      </TableCell>
      <TableCell component="td" sx={{ borderRadius: "0px 8px 8px 0px" }}>
        <Typography variant="body1" fontSize={14}>
          {formatToDate(tx.formatedDate)}
        </Typography>
      </TableCell>
    </TableRow>
  ));

  if (!transactions || transactions.length === 0) {
    return <NoTransactionsMessage />;
  }

  return (
    <>
      <TableComponent
        tableStyles={{
          "& th": {
            backgroundColor: "#29292E80",
          },
          "& tr": {
            borderColor: "#202024",
          },
          "& td, & th": {
            border: 0, // Remove as bordas das células
            bottomTop: "8px solid #202024",
            borderBottom: "8px solid #202024",
          },
          borderCollapse: "collapse",
        }}
        bodyChildren={tableBody}
        headerChildren={tableHeader}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          paddingTop: 2,
        }}
      >
        <PaginationComponent
          page={currentPage}
          handleChange={setCurrentPage}
          count={lastPage}
        />
      </Box>
      <Modal
        open={removeTransactionModalOpen}
        onClose={() => setRemoveTransactionModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TransactionDetailsModal
          ref={transactionDetailsModalRef}
          onClose={() => setRemoveTransactionModalOpen(false)}
          transaction={transactionToRemove}
        />
      </Modal>
    </>
  );
}
