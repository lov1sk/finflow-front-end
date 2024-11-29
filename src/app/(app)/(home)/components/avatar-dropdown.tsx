"use client";

import { stringAvatar } from "@/app/utils/material-ui/render-avatar-name";
import { signOut } from "@/http/auth/sign-out";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";
import { UserProfileModal } from "./user-modal/user-profile-modal";
import { User } from "@/types/user";

interface AvatarDropdownProps {
  user: User;
}
export function AvatarDropdown({ user }: AvatarDropdownProps) {
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDropdown = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => await signOut();
  return (
    <>
      <Button
        onClick={handleOpenDropdown}
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Avatar
          {...stringAvatar(user.name)}
          sx={{
            bgcolor: "#181818",
            color: "#71717A",
            border: "2px solid #27272A",
            width: "30px",
            height: "30px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {user.name}
        </Typography>
        <ChevronDown
          strokeWidth={2.5}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseDropdown}
        sx={{ margin: 0, padding: 0 }}
      >
        <MenuItem
          sx={{
            width: "210px",
            height: "46px",
            borderBottom: "1px",
            borderColor: "red",
          }}
          onClick={() => setOpenProfileModal(true)}
        >
          Ver Perfil
        </MenuItem>
        <MenuItem
          className="dropdown-hover"
          sx={{
            margin: 0,
            width: "210px",
            height: "46px",
            color: "#F87171",
            borderBottom: "1px",
            borderColor: "red",
          }}
          onClick={handleSignOut}
        >
          Sair
          <LogOut
            style={{ width: "20px", height: "20px", marginLeft: "auto" }}
          />
        </MenuItem>
      </Menu>
      <Modal
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserProfileModal
          user={user}
          onClose={() => setOpenProfileModal(false)}
        />
      </Modal>
    </>
  );
}
