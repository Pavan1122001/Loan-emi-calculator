import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function ScheduleTable({ schedule, currentRate, currency }) {
  if (!schedule.length) return null;

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        maxHeight: 400,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "auto",
      }}
    >
        <Typography variant="h6" sx={{ mt: 3, mb: 1, ml: 2 }}>Amortization Schedule ({currency})</Typography>
      <Table stickyHeader size="small" aria-label="loan schedule table">
        <TableHead sx={{ bgcolor: "primary.main" }}>
          <TableRow>
            <TableCell sx={{ padding:2 }}><strong>Month</strong></TableCell>
            <TableCell align="right" sx={{ padding:2 }}><strong>Principal</strong></TableCell>
            <TableCell align="right" sx={{ padding:2 }}><strong>Interest</strong></TableCell>
            <TableCell align="right" sx={{ padding:2 }}><strong>Remaining Balance</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row) => (
            <TableRow
              key={row.month}
            >
              <TableCell>{row.month}</TableCell>
              <TableCell align="right">
                {isNaN(row.principalPaid * currentRate)
                  ? "-"
                  : `${(row.principalPaid * currentRate).toFixed(2)} ${currency}`}
              </TableCell>
              <TableCell align="right">
                {isNaN(row.interestPaid * currentRate)
                  ? "-"
                  : `${(row.interestPaid * currentRate).toFixed(2)} ${currency}`}
              </TableCell>
              <TableCell align="right">
                {isNaN(row.balance * currentRate)
                  ? "-"
                  : `${(row.balance * currentRate).toFixed(2)} ${currency}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
