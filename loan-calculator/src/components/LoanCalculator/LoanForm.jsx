import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoanForm({ onCalculate }) {
  const validationSchema = Yup.object({
    principal: Yup.number().required("Required").positive("Must be a positive number"),
    rate: Yup.number().required("Required").positive("Must be a positive number"),
    tenureYears: Yup.number().required("Required").positive("Must be a positive number"),
  });

  const formik = useFormik({
    initialValues: { principal: "", rate: "", tenureYears: "" },
    validationSchema,
    onSubmit: (values) => onCalculate({
      principal: Number(values.principal),
      rate: Number(values.rate),
      tenureYears: Number(values.tenureYears)
    })
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Principal Amount"
            name="principal"
            value={formik.values.principal}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched.principal && Boolean(formik.errors.principal)}
            helperText={formik.touched.principal && formik.errors.principal
              ? formik.errors.principal
              : " "}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Annual Interest Rate (%)"
            name="rate"
            value={formik.values.rate}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched.rate && Boolean(formik.errors.rate)}
            helperText={formik.touched.rate && formik.errors.rate ? formik.errors.rate : " "}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Loan Tenure (years)"
            name="tenureYears"
            value={formik.values.tenureYears}
            onChange={formik.handleChange}
            fullWidth
            onBlur={formik.handleBlur}
            error={formik.touched.tenureYears && Boolean(formik.errors.tenureYears)}
            helperText={formik.touched.tenureYears && formik.errors.tenureYears?formik.errors.tenureYears : " "}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Calculate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}