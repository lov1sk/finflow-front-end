"use client";

import { stringAvatar } from "@/app/utils/material-ui/render-avatar-name";
import { signOut } from "@/http/auth/sign-out";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";

interface AvatarDropdownProps {
  username: string;
}
export function AvatarDropdown({ username }: AvatarDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => await signOut();
  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Avatar
          {...stringAvatar(username)}
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
          {username}
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
        onClose={handleClose}
        sx={{ margin: 0, padding: 0 }}
      >
        <MenuItem
          sx={{
            width: "210px",
            height: "46px",
            borderBottom: "1px",
            borderColor: "red",
          }}
          onClick={handleClose}
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
    </>
  );
}
