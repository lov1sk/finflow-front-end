import { NumberInput } from "@/components/number-input";
import { SelectInput } from "@/components/select-input";
import { TextInput } from "@/components/text-input";
import { registerGenders } from "@/app/utils/get-available-genders";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { editUser } from "@/http/user/edit-profile";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const editProfileFormSchema = z.object({
  name: z.string().min(1, "Por favor, insira um nome valido"),
  age: z.coerce
    .number()
    .refine((value) => value > 1, "Insira uma idade maior que 1"),
  gender: z.string().min(1),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;

interface EditProfileFormProps {
  user?: User;
  closeForm: () => void;
}

export function EditProfileForm({ closeForm, user }: EditProfileFormProps) {
  const router = useRouter();
  const [editUserErrorMessage, setEditUserErrorMessage] = useState<
    string | undefined
  >(undefined);

  const formMethods = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      age: user?.age,
      gender: user?.gender ?? "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const handleEditUser = async (payload: EditProfileFormSchema) => {
    const response = await editUser(payload);
    if (response.error) {
      return setEditUserErrorMessage(response.errorMessage);
    }

    closeForm();
    router.refresh();
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      onSubmit={handleSubmit(handleEditUser)}
    >
      <Stack sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <TextInput
          size="small"
          label="Nome"
          control={control}
          name="name"
          error={errors.name}
          placeholder="Insira seu nome atualizado"
        />
      </Stack>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <NumberInput
          size="small"
          label="Idade"
          control={control}
          name="age"
          error={errors.age}
          placeholder="Insira sua idade atualizada"
        />
      </Stack>
      <Stack sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <SelectInput
          id="gender"
          label="Gênero"
          size="small"
          control={control}
          name="gender"
          error={errors.gender}
          options={registerGenders.map((gender, index) => ({
            label: gender,
            value: gender,
            key: index,
          }))}
        />
      </Stack>
      {editUserErrorMessage && (
        <Alert severity="error">{editUserErrorMessage}</Alert>
      )}
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Salvar
      </Button>
      <Button type="button" color="secondary" onClick={closeForm}>
        Voltar
      </Button>
    </form>
  );
}
