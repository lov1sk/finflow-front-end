import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/material";

interface TableComponentProps {
  tableStyles?: SxProps;
  headerStyles?: SxProps;
  bodyStyles?: SxProps;
  headerChildren: React.ReactNode;
  bodyChildren: React.ReactNode;
}

export function TableComponent({
  headerStyles,
  tableStyles,
  bodyStyles,
  headerChildren,
  bodyChildren,
}: TableComponentProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ ...tableStyles }} aria-label="simple table">
        <TableHead sx={{ ...headerStyles }}>{headerChildren}</TableHead>
        <TableBody sx={{ ...bodyStyles }}>{bodyChildren}</TableBody>
      </Table>
    </TableContainer>
  );
}
