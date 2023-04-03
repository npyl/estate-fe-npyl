import { useState } from "react";
import type { FC } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectEmail,
  selectContantNumber,
  selectFbURL,
  selectSkypeId,
  setContactStep,
} from "../../../slices/account";
import { useDispatch, useSelector } from "src/store";
import { useAuth } from "src/hooks/use-auth";

interface ContactStepProps {
  onNext: () => void;
  onBack: () => void;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Is not in correct format")
    .required("Email is required"),
  contantNumber: Yup.string().max(40),
  fbURL: Yup.string().max(50),
  skypeId: Yup.string().max(30),
});

export const ContactStep: FC<ContactStepProps> = (props) => {
  const { onBack, onNext } = props;
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const contantNumber = useSelector(selectContantNumber);
  const fbURL = useSelector(selectFbURL);
  const skypeId = useSelector(selectSkypeId);
  const { user } = useAuth();
  const initialValues = {
    email: email || user?.email || "",
    contantNumber: contantNumber || user?.contactNumber || "",
    fbURL: fbURL || user?.facebookUrl || "",
    skypeId: skypeId || user?.skypeId || "",
    submit: null,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values): Promise<void> => {
      dispatch(setContactStep(values));
      onNext();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={3}>
        <Stack spacing={2}>
          <TextField
            type='email'
            required
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label='Email'
            name='email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            error={Boolean(
              formik.touched.contantNumber && formik.errors.contantNumber
            )}
            fullWidth
            helperText={
              formik.touched.contantNumber && formik.errors.contantNumber
            }
            label='Contant Number'
            name='contantNumber'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contantNumber}
          />
          <TextField
            error={Boolean(formik.touched.fbURL && formik.errors.fbURL)}
            fullWidth
            helperText={formik.touched.email && formik.errors.fbURL}
            label='Facebook Profile URL'
            name='fbURL'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fbURL}
          />
          <TextField
            error={Boolean(formik.touched.skypeId && formik.errors.skypeId)}
            fullWidth
            helperText={formik.touched.skypeId && formik.errors.skypeId}
            label='Skype Id'
            name='skypeId'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.skypeId}
          />
        </Stack>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize='small' />}
          type='submit'
          variant='contained'
        >
          Continue
        </Button>
        <Button onClick={onBack}
sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </form>
  );
};
