"use client";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NewTransactionModal } from "./new-transaction-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchTransactionsInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newTransactionModalRef = useRef(null);

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [openNewTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("query", searchValue ?? "");
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "32px",
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Busque uma transação pelo nome"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <Box sx={{}}>
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
          sx={{ width: "180px", height: "40px" }}
          onClick={() => setOpenTransactionModal(true)}
        >
          <Typography variant="body2">Nova Transação</Typography>
        </Button>
      </Box>

      <Modal
        open={openNewTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        aria-labelledby="new-transaction-modal"
        aria-describedby="modal-for-create-new-transaction"
      >
        <NewTransactionModal
          ref={newTransactionModalRef}
          onClose={() => setOpenTransactionModal(false)}
        />
      </Modal>
    </Box>
  );
}
