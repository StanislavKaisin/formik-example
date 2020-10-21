import {
  Box,
  Button,
  CardContent,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import React from "react";
import { array, boolean, mixed, number, object, string } from "yup";
import { InvestmentDetails } from "./interfaces/InvestmentDetails";

const initialValues: InvestmentDetails = {
  fullName: "",
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: "",
  dependents: -1,
  acceptedTermsAndConditions: false,
};

export const FormDemo = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>
        <Formik
          validationSchema={object({
            fullName: string()
              .required("Your name is mandatory!!")
              .min(2)
              .max(100),
            initialInvestment: number().required().min(100),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
            investmentRisk: array(
              string().oneOf(["High", "Medium", "Low"])
            ).min(1),
            commentAboutInvestmentRisk: mixed().when("investmentRisk", {
              is: (investmentRisk: string[]) => {
                return investmentRisk.find((risk) => risk === "High");
              },
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log("values=", values);
                console.log("formikHelpers=", formikHelpers);
                console.log("======================================");
                resolve();
              }, 5000);
            });
          }}
        >
          {({ values, errors, touched, isSubmitting, isValidating }) => {
            return (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field name="fullName" as={TextField} label="Full Name" />
                    <ErrorMessage name="fullName" />
                    {/* {touched.fullName && errors.fullName
                      ? errors.fullName
                      : null} */}
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="initialInvestment"
                      type="number"
                      as={TextField}
                      label="Initial Investment"
                    />
                    <ErrorMessage name="initialInvestment" />
                  </FormGroup>
                </Box>

                <Box marginBottom={2}>
                  <FormGroup>
                    <InvestmentRiskCheckbox
                      name="investmentRisk"
                      value="High"
                      label="High - Risky"
                    />
                    <InvestmentRiskCheckbox
                      name="investmentRisk"
                      value="Medium"
                      label="Medium - Risky"
                    />
                    <InvestmentRiskCheckbox
                      name="investmentRisk"
                      value="Low"
                      label="Low - Safe"
                    />
                    {/* undescribed fied follows to mistake! */}
                    {/* <InvestmentRiskCheckbox
                      name="investmentRisk"
                      value="Very Low"
                      label="Very Low - Safe"
                    /> */}
                  </FormGroup>
                  <ErrorMessage name="investmentRisk" />
                </Box>
                {/* <Field name="investmentRisk" value="High" type="checkbox" />
                <Field name="investmentRisk" value="Medium" type="checkbox" />
                <Field name="investmentRisk" value="Low" type="checkbox" /> */}
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="commentAboutInvestmentRisk"
                      as={TextField}
                      multiline
                      rows={5}
                    />
                    <ErrorMessage name="commentAboutInvestmentRisk" />
                  </FormGroup>
                  <FormGroup>
                    <Field name="dependents" as={TextField} select>
                      <MenuItem value={-1}>Select...</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Field>
                    <ErrorMessage name="dependents" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <InvestmentRiskCheckbox
                      name="acceptedTermsAndConditions"
                      label="Accept Terms and Conditions"
                    />
                    <ErrorMessage name="acceptedTermsAndConditions" />
                  </FormGroup>
                </Box>
                {/* <Field name="acceptedTermsAndConditions" type="checkbox" /> */}
                <Button type="submit" disabled={isSubmitting || isValidating}>
                  Submit
                </Button>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export const InvestmentRiskCheckbox = (props: MyCheckboxProps) => {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
};
