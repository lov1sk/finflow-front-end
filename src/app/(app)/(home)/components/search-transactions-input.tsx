"use client";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Plus, SearchIcon } from "lucide-react";
import { useState } from "react";
import { NewTransactionModal } from "./new-transaction-modal";

export function SearchTransactionsInput() {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [openNewTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Busque uma transação pelo nome"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        sx={{
          maxWidth: "600px",
        }}
      />
      <Button
        variant="outlined"
        startIcon={
          <SearchIcon
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        }
        sx={{
          color: "#00B37E",
        }}
      >
        Buscar
      </Button>
      <Button
        size="small"
        variant="contained"
        startIcon={
          <Plus
            style={{
              width: "16px",
              height: "16px",
            }}
          />
        }
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenTransactionModal(true)}
      >
        <Typography variant="body2">Nova Transação</Typography>
      </Button>

      <Modal
        open={openNewTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewTransactionModal onClose={() => setOpenTransactionModal(false)} />
      </Modal>
    </Box>
  );
}
