import { BaseModal } from "@/app/components/base-modal";
import { CurrencyInput } from "@/app/components/currency-input";
import { RadioSelect } from "@/app/components/radio-select";
import { TextInput } from "@/app/components/text-input";
import { removeCurrencyMask } from "@/app/utils/material-ui/remove-currency-mask";
import { createTransaction } from "@/http/transactions/create-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newTransactionFormSchema = z.object({
  name: z.string(),
  value: z
    .string()
    .transform((value) => removeCurrencyMask(value))
    .refine((value) => value >= 1, "Insira um valor maior que R$1,00"),
  category: z.string(),
  type: z.string().min(1, "Escolha um tipo de transação"),
});

type NewTransactionFormSchema = z.infer<typeof newTransactionFormSchema>;

interface NewTransactionModalProps {
  onClose: () => void;
}
export function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const formMethods = useForm<NewTransactionFormSchema>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      name: "",
      category: "",
      value: 0,
      type: "",
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
    // remove this after
    await new Promise((resolve) => setTimeout(() => resolve("sadas"), 2000));

    await createTransaction(payload);
    onClose();
  };

  return (
    <BaseModal title="Nova Transação" onClose={onClose}>
      <form
        onSubmit={handleSubmit(handleSaveNewTransaction)}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <TextInput
          sx={{
            backgroundColor: "#121214",
            borderRadius: "4px",
          }}
          control={control}
          name="name"
          placeholder="Insira um Nome"
          label="Nome"
          error={errors.name}
        />
        <CurrencyInput
          label="Valor R$"
          control={control}
          name="value"
          error={errors.value}
        />
        <TextInput
          control={control}
          name="category"
          placeholder="Insira uma categoria"
          label="Categoria"
          error={errors.category}
        />
        <RadioSelect
          name="type"
          control={control}
          error={errors.type}
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
