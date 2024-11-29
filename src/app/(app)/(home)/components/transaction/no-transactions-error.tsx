"use client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { NewTransactionModal } from "./new-transaction-modal";
import React, { useState } from "react";
import NoDataIcon from "@/assets/no-data-icon";
export function NoTransactionsErrorMessage() {
  const [openNewTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          maxWidth: "300px",
          marginX: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          gap: "16px",
        }}
      >
        <NoDataIcon />
        <Typography variant="subtitle1">
          Nenhuma transação previa encontrada, cadastre uma abaixo
        </Typography>
        <Button
          variant="contained"
          startIcon={
            <Plus
              style={{
                width: "16px",
                height: "16px",
              }}
            />
          }
          sx={{ marginX: "auto" }}
          onClick={() => setOpenTransactionModal(true)}
        >
          <Typography variant="body2">Nova Transação</Typography>
        </Button>
      </Box>
      <Modal
        open={openNewTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewTransactionModal onClose={() => setOpenTransactionModal(false)} />
      </Modal>
    </>
  );
}
