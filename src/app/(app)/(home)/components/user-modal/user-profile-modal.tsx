"use client";
import { BaseModal } from "@/components/base-modal";
import { PropertyWithLabel } from "@/components/property-with-label";
import { stringAvatar } from "@/app/utils/material-ui/render-avatar-name";
import { getProfile } from "@/http/user/get-profile";
import { User } from "@/types/user";
import { Avatar, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { EditProfileForm } from "./edit-profile-form";
import React from "react";

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
}

export function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  const [showShowEditProfileForm, setShowEditProfileForm] =
    useState<boolean>(false);

  return (
    <BaseModal title="Detalhes do perfil" onClose={onClose}>
      <Avatar
        {...stringAvatar(user.name)}
        sx={{
          marginX: "auto",
          bgcolor: "#181818",
          color: "#71717A",
          border: "2px solid #27272A",
          width: "152px",
          height: "155px",
          fontSize: "64px",
          fontWeight: "bold",
        }}
      />
      {showShowEditProfileForm && (
        <EditProfileForm
          closeForm={() => setShowEditProfileForm(false)}
          user={user}
        />
      )}
      {!showShowEditProfileForm && (
        <>
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <PropertyWithLabel title="Nome:" value={user?.name} type="text" />
            <PropertyWithLabel
              title="E-mail:"
              value={user?.email}
              type="text"
            />
            <PropertyWithLabel title="Idade:" value={user?.age} type="text" />
            <PropertyWithLabel
              title="Gênero:"
              value={user?.gender}
              type="text"
            />
            <PropertyWithLabel
              title="Criado em: "
              value={user?.createdAt}
              type="date"
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => setShowEditProfileForm(true)}
          >
            Editar Perfil
          </Button>
        </>
      )}
    </BaseModal>
  );
}
