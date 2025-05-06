import React, { useEffect, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import LoanForm from "./LoanForm";
import EmiResult from "./EmiResult";
import ScheduleTable from "./ScheduleTable";
import { calculateEMI, getAmortizationSchedule } from "./utils";

const API_KEY = "26c82bfeabe4d2ef26df8c52";
const BASE_CURRENCY = "INR";

const LoanCalculator = () => {
  const [emi, setEmi] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState({ INR: 1 });
  const [currentRate, setCurrentRate] = useState(1);
  const [loadingRates, setLoadingRates] = useState(false);

  const handleCalculate = (values) => {
    const tenureMonths = Number(values.tenureYears) * 12;
    const emiValue = calculateEMI(Number(values.principal), Number(values.rate), tenureMonths);
    setEmi(emiValue);
    if (emiValue) {
      setSchedule(getAmortizationSchedule(Number(values.principal), Number(values.rate), tenureMonths, emiValue));
    } else {
      setSchedule([]);
    }
  };

  const handleReset = () => {
    setEmi("");
    setSchedule([]);
  };

  useEffect(() => {
    async function fetchRates() {
      setLoadingRates(true);
      try {
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`);
        setRates(res.data.conversion_rates);
      } catch {
        setRates({ INR: 1 });
      }
      setLoadingRates(false);
    }
    fetchRates();
  }, []);

  useEffect(() => {
    setCurrentRate(Number(rates[currency]) || 1);
  }, [currency, rates]);

  return (
    <Box maxWidth={900} mx="auto" mt={4} px={2}>
      <Card>
        <CardContent>
          <LoanForm onCalculate={handleCalculate} />
          {emi && (
            <>
              <EmiResult
                emi={emi}
                currentRate={currentRate}
                currency={currency}
                setCurrency={setCurrency}
                loadingRates={loadingRates}
              />
              <ScheduleTable
                schedule={schedule}
                currency={currency}
                currentRate={currentRate}
                onReset={handleReset}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoanCalculator;
