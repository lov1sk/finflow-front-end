"use client";
import { BaseModal } from "@/components/base-modal";
import { CurrencyInput } from "@/components/currency-input";
import { RadioSelect } from "@/components/radio-select";
import { TextInput } from "@/components/text-input";
import { createTransaction } from "@/http/transactions/create-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateInput } from "@/components/date-input";
import { useRouter } from "next/navigation";
import { getTransactionsCategories } from "@/http/transactions/get-categories";
import { SelectInput } from "@/components/select-input";

const newTransactionFormSchema = z.object({
  date: z.coerce.date().transform((value) => dayjs(value).format("YYYY-MM-DD")),
  description: z.string().min(1, "Insira uma descrição"),
  value: z
    .number({ message: "Insira um valor válido" })
    .refine((value) => value > 1, "Insira um valor maior que R$1,00"),
  category: z.string(),
  typeTransaction: z.string().min(1, "Escolha um tipo de transação"),
});

type NewTransactionFormSchema = z.infer<typeof newTransactionFormSchema>;

interface NewTransactionModalProps {
  onClose: () => void;
}

export const NewTransactionModal = forwardRef(
  ({ onClose }: NewTransactionModalProps, ref) => {
    const router = useRouter();

    const [categories, setCategories] = useState<string[]>([]);

    const formMethods = useForm<NewTransactionFormSchema>({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        date: dayjs(new Date()) as any,
        description: "",
        category: "",
        value: 0,
        typeTransaction: "",
      },
    });

    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = formMethods;

    const handleSaveNewTransaction = async (
      payload: NewTransactionFormSchema
    ) => {
      const response = await createTransaction(payload);
      if (response.error) {
        // return setCreateNewTransactionError(response.errorMessage);
      }
      router.refresh();
      onClose();
    };

    const getCategories = async () => {
      const response = await getTransactionsCategories();
      if (response.success) {
        console.log({ categories: response?.data?.categories });

        setCategories(response?.data?.categories ?? []);
      }
    };

    useEffect(() => {
      getCategories();
    }, []);

    return (
      <BaseModal title="Nova Transação" onClose={onClose}>
        <form
          onSubmit={handleSubmit(handleSaveNewTransaction)}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <DateInput
            name="date"
            control={control}
            error={errors.date}
            label="Data da transação"
          />
          <TextInput
            sx={{
              backgroundColor: "#121214",
              borderRadius: "4px",
            }}
            control={control}
            name="description"
            placeholder="Insira uma descrição"
            label="Descrição da transação"
            error={errors.description}
          />
          <CurrencyInput
            label="Valor R$"
            control={control}
            name="value"
            error={errors.value}
          />
          <SelectInput
            id="category"
            control={control}
            name="category"
            label="Categoria"
            error={errors.category}
            options={categories.map((cat, index) => ({
              label: cat,
              value: cat,
              key: index,
            }))}
          />
          <RadioSelect
            name="typeTransaction"
            control={control}
            error={errors.typeTransaction}
            options={[
              {
                value: "credit",
                label: "Entrada",
              },
              {
                value: "debit",
                label: "Saída",
              },
            ]}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </form>
      </BaseModal>
    );
  }
);
