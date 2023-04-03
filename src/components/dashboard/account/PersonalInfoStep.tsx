import { useState } from "react";
import type { FC } from "react";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { useGetDepartmentsQuery } from "src/services/mypath";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "../../../store";
import {
  selectFirstName,
  selectLastName,
  selectScreenName,
  selectDepartment,
  selectLivesIn,
  setPersonalInfoStep,
} from "../../../slices/account";
import { useAuth } from "src/hooks/use-auth";

interface PersonalInfoStepProps {
  onNext: () => void;
}

const validationSchema = Yup.object({
  department: Yup.number(),
  firstName: Yup.string().max(40).required("First Name is required"),
  lastName: Yup.string().max(40).required("Last Name is required"),
  screenName: Yup.string().max(40).required("Screen Name is required"),
  livesIn: Yup.string().max(40),
});

export const PersonalInfoStep: FC<PersonalInfoStepProps> = (props) => {
  const { onNext } = props;
  const dispatch = useDispatch();
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const screenName = useSelector(selectScreenName);
  const department = useSelector(selectDepartment);
  const livesIn = useSelector(selectLivesIn);

  const { data: departments } = useGetDepartmentsQuery();
  const { user } = useAuth();
  const initialValues = {
    firstName: firstName || user?.firstName || "",
    lastName: lastName || user?.lastName || "",
    screenName: screenName || user?.screenName || "",
    department: department || user?.departmentId || 0,
    livesIn: livesIn || user?.livesIn || "",
    submit: null,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values): Promise<void> => {
      dispatch(setPersonalInfoStep(values));
      onNext();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={3}>
        <Stack spacing={4}>
          <TextField
            required
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            fullWidth
            helperText={formik.touched.firstName && formik.errors.firstName}
            label='First Name'
            name='firstName'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <TextField
            required
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            fullWidth
            helperText={formik.touched.lastName && formik.errors.lastName}
            label='Last Name'
            name='lastName'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <TextField
            required
            error={Boolean(
              formik.touched.screenName && formik.errors.screenName
            )}
            fullWidth
            helperText={formik.touched.screenName && formik.errors.screenName}
            label='Screen Name'
            name='screenName'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.screenName}
          />

          <TextField
            error={Boolean(
              formik.touched.department && formik.errors.department
            )}
            fullWidth
            helperText={formik.touched.department && formik.errors.department}
            label='Department'
            name='department'
            onBlur={formik.handleBlur}
            onChange={({ target: { value } }) => {
              formik.setFieldValue("department", value);
            }}
            value={formik.values.department || ""}
            select
          >
            {departments ? (
              departments.map((option: any) => (
                <MenuItem key={option.title}
value={option.id}>
                  {option.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem>-</MenuItem>
            )}
          </TextField>

          <TextField
            error={Boolean(formik.touched.livesIn && formik.errors.livesIn)}
            fullWidth
            helperText={formik.touched.livesIn && formik.errors.livesIn}
            label='Lives In'
            name='livesIn'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.livesIn}
          />
        </Stack>
      </Box>
      <Button
        endIcon={<ArrowRightIcon fontSize='small' />}
        type='submit'
        variant='contained'
      >
        Continue
      </Button>
    </form>
  );
};
