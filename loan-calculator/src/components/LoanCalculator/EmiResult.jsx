import React from "react";
import { Typography, Grid, TextField, MenuItem, Button } from "@mui/material";

const COMMON_CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "INR", symbol: "₹" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
];

const BASE_CURRENCY = "INR";

export default function EmiResult({ emi, currency, setCurrency, currentRate, loadingRates, onReset }) {
  if (!emi) return null;
  const currencyObj = COMMON_CURRENCIES.find((c) => c.code === currency);
  const currencySymbol = currencyObj ? currencyObj.symbol : currency + " ";

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Monthly EMI: {currencySymbol}
        {(emi * currentRate).toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
        Exchange Rate: 1 {BASE_CURRENCY} = {currentRate} {currency}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 3 }} sx={{ mt: 3 }}>
          <TextField
            select
            label="Currency"
            fullWidth
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={loadingRates}
          >
            {COMMON_CURRENCIES.map(({ code, symbol }) => (
              <MenuItem key={code} value={code}>
                {symbol} {code}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }} sx={{ mt: 3 }}>
          <Button variant="outlined" color="secondary" onClick={onReset}>
            Reset Table
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
