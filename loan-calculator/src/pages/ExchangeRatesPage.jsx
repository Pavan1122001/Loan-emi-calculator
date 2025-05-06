import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const API_KEY = '26c82bfeabe4d2ef26df8c52';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`;

const ExchangeRatesPage = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [converted, setConverted] = useState('');

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(BASE_URL);
        setRates(res.data.conversion_rates);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch exchange rates.');
      }
      setLoading(false);
    }
    fetchRates();
  }, []);

  useEffect(() => {
    if (amount && rates[currency]) {
      setConverted((Number(amount) * rates[currency]).toFixed(2));
    } else {
      setConverted('');
    }
  }, [amount, currency, rates]);

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Exchange Rates (Live)</Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <TextField
                label="Amount in INR"
                type="number"
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <TextField
                select
                label="Convert to"
                fullWidth
                margin="normal"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                {Object.keys(rates).map(code => (
                  <MenuItem key={code} value={code}>{code}</MenuItem>
                ))}
              </TextField>
              {converted && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Converted Amount: {currency} {converted}
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ExchangeRatesPage
