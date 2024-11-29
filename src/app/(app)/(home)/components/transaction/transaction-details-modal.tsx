import { BaseModal } from "@/components/base-modal";
import DisplayAmount from "@/components/display-amount";
import { removeTransaction } from "@/http/transactions/remove-transaction";
import { Transaction } from "@/types/transaction";
import { Alert, Box, Button, Typography, Grid2 } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TransactionDetailsModalProps {
  onClose: () => void;
  transaction?: Transaction;
}
export function TransactionDetailsModal({
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleRemoveTransaction = async (transactionId?: string) => {
    if (!transactionId) return;
    const response = await removeTransaction({
      id: transactionId,
    });

    if (response.error) {
      return setErrorMessage(response.errorMessage);
    }

    router.refresh();
    onClose();
  };
  return (
    <BaseModal
      title="Detalhes de uma transação"
      onClose={onClose}
      sx={{
        width: {
          sm: "70%",
          lg: "40%",
        },
      }}
    >
      <Grid2 container spacing={8} columns={{ xs: 1, sm: 1, md: 3 }}>
        <Grid2 xs={4} sm={2} md={1}>
          <DisplayAmount
            label="Identificador"
            text={transaction?.idTransaction}
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        columns={{ xs: 1, sm: 1, md: 3 }}
        sx={{ justifyContent: "space-between" }}
      >
        <Grid2 xs={4} sm={2} md={1}>
          <DisplayAmount
            label="Data"
            date={transaction?.formatedDate}
            dateType
          />
        </Grid2>
        <Grid2 xs={4} sm={2} md={1}>
          <DisplayAmount label="Categoria" text={transaction?.category} />
        </Grid2>
        <Grid2 xs={4} sm={2} md={1}>
          <DisplayAmount
            label="Valor R$"
            value={transaction?.valueTransaction}
            money
          />
        </Grid2>
        <Grid2 xs={4} sm={2} md={1}>
          <DisplayAmount label="Descrição" text={transaction?.description} />
        </Grid2>
      </Grid2>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveTransaction(transaction?.idTransaction)}
      >
        Remover
      </Button>
    </BaseModal>
  );
}
