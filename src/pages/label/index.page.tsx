import ColorizeIcon from "@mui/icons-material/Colorize";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState } from "react";
import { BlockPicker } from "react-color";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { Label } from "src/components/label";
import { useAllCustomersQuery } from "src/services/customers";
import {
  useCreateLabelForCustomerWithIDMutation,
  useCreateLabelForCustomersMutation,
  useCreateLabelForPropertiesMutation,
  useCreateLabelForPropertyWithIDMutation,
  useGetLabelsQuery,
} from "src/services/labels";
import { useAllPropertiesQuery } from "src/services/properties";
import { ICustomer } from "src/types/customer";
import { ILabel } from "src/types/label";
import { IProperties } from "src/types/properties";

const SingleProperty: NextPage = () => {
  const [pickerColor, setPickerColor] = useState("#22194d");
  const [labelName, setLabelName] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const { data: labels } = useGetLabelsQuery();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [assigneeType, setAssigneeType] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState("");

  const [createLabelForPropertyWithID, { isSuccess: createForPropertySuccess }] =
    useCreateLabelForPropertyWithIDMutation();
  const [createLabelForCustomerWithID, { isSuccess: createForCustomerSuccess }] =
    useCreateLabelForCustomerWithIDMutation();
  const [createLabelForProperties, { isSuccess: createForPropertiesSuccess }] = useCreateLabelForPropertiesMutation();
  const [createLabelForCustomers, { isSuccess: createForCustomersSuccess }] = useCreateLabelForCustomersMutation();

  const properties: string[] =
    useAllPropertiesQuery(undefined, {
      selectFromResult: ({ data }) => ({
        data: data
          ?.filter((property) => property.code !== null)
          .map((property) => {
            return property.code;
          }),
      }),
    }).data || [];
  const allProperties: IProperties[] = useAllPropertiesQuery().data || [];

  const customers: string[] =
    useAllCustomersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        data: data
          ?.filter(
            (customer) => customer.id && customer.firstName && customer.lastName
          )
          .map((customer) => {
            return customer.firstName + " " + customer.lastName;
          }),
      }),
    }).data || [];
  const allCustomers: ICustomer[] = useAllCustomersQuery().data || [];

  const handleChangeComplete = (color: any) => {
    setPickerColor(color.hex);
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleAssigneeTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAutocompleteValue(""); // clear
    setAssigneeType((event.target as HTMLInputElement).value);
  };
  const autocompleteChange = (_event: any, value: string | null) => {
    if (!value) return;
    setAutocompleteValue(value);
  };

  const createLabel = () => {
    const propertyIdForCode = (code: string) => {
      const property = allProperties.find(
        (property) => property.code === code
      );
      return property?.id;
    };
    const customerIdForFullname = (fullname: string) => {
      const customer = allCustomers.find(
        (customer) => customer.firstName + " " + customer.lastName === fullname
      );
      return customer?.id;
    };

    const code = autocompleteValue;
    const label = { color: pickerColor, name: labelName };

    if (code === "") {
      // create without assign
      if (assigneeType === 'property') {
        createLabelForProperties(label);
      }
      else if (assigneeType === 'customer') {
        createLabelForCustomers(label);
      }
    }
    else {
      // create with assign

      if (assigneeType === "property") {

        const propertyId = propertyIdForCode(code);

        if (!propertyId) return null;

        createLabelForPropertyWithID({
          propertyId: propertyId,
          labelBody: label,
        });
      } else if (assigneeType === "customer") {
        const customerId = customerIdForFullname(code);

        if (!customerId) return null;

        createLabelForCustomerWithID({
          customerId: customerId,
          labelBody: label,
        });
      }
    }
  };

  const labelData: Record<string, { label: string, data: ILabel[] }> | null = useMemo(() => {
    if (!labels) return null;

    return {
      propertyLabels: {
        label: 'Ακίνητα: ',
        data: labels.propertyLabels
      },
      customerLabels: {
        label: 'Πελάτες: ',
        data: labels.customerLabels
      }
    };
  }, [labels]);

  return (
    <Grid container direction={"row"} gap={1} paddingY={3}>
      <Grid component={Paper} item xs={12} sm={4} p={2}>
        <Typography variant='h5'>Δημιουργία νέας</Typography>
        <Stack spacing={3} mt={2}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                <Typography
                  variant='subtitle2'
                  sx={{ color: "text.secondary" }}
                >
                  Επιλέξτε ετικέτα για:
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={assigneeType}
                onChange={handleAssigneeTypeChange}
              >
                <FormControlLabel
                  value='property'
                  control={<Radio />}
                  label='Ακίνητο'
                />
                <FormControlLabel
                  value='customer'
                  control={<Radio />}
                  label='Πελάτης'
                />
              </RadioGroup>
            </FormControl>
            {assigneeType && (
              <FormControl>
                <FormLabel id='demo-controlled-radio-buttons-group'>
                  <Typography
                    variant='subtitle2'
                    sx={{ color: "text.secondary" }}
                  >
                    Εισάγετε όνομα:
                  </Typography>
                </FormLabel>
                <Stack direction={"row"} spacing={1}>
                  <TextField
                    id='outlined-select-currency'
                    value={labelName}
                    placeholder="Νέα Ετικέτα"
                    onFocus={(event) => event.target.placeholder = ""}
                    onBlur={(event) => event.target.placeholder = "Νέα Ετικέτα"}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLabelName(event.target.value);
                    }}
                  />

                  <Button
                    variant='outlined'
                    onClick={() => {
                      setOpenPicker(!openPicker);
                    }}
                    ref={buttonRef}
                  >
                    <ColorizeIcon />
                  </Button>

                  {openPicker && buttonRef.current && (
                    <Box
                      style={{
                        position: "absolute",
                        left: buttonRef.current.offsetLeft - 60,
                        top:
                          buttonRef.current.offsetTop +
                          buttonRef.current.offsetHeight +
                          10,
                        zIndex: 999,
                      }}
                    >
                      <BlockPicker
                        color={pickerColor}
                        onChangeComplete={handleChangeComplete}
                      />
                    </Box>
                  )}
                </Stack>
                <FormControl>
                  <Stack direction={"row"} paddingTop={2} spacing={3}>
                    <FormLabel id='demo-controlled-radio-buttons-group'>
                      <Typography
                        variant='subtitle2'
                        sx={{ color: "text.secondary" }}
                      >
                        Προεπισκόπιση:
                      </Typography>
                    </FormLabel>
                    <Label
                      variant='soft'
                      sx={{
                        bgcolor: pickerColor,
                        borderRadius: 7,
                        color: "white",
                      }}
                    >
                      {labelName || "Νέα Ετικέτα"}
                    </Label>
                  </Stack>
                  <Stack paddingTop={1} direction={"row"} alignItems={"center"}>
                    <FormLabel id='demo-controlled-radio-buttons-group'>
                      <Typography
                        variant='subtitle2'
                        sx={{ color: "text.secondary" }}
                      >
                        Επιθυμείτε ανάθεση τώρα;
                      </Typography>
                    </FormLabel>
                    <Checkbox
                      checked={checked}
                      onChange={handleCheck}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Stack>
                  {checked && (
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      value={autocompleteValue}
                      onChange={autocompleteChange}
                      options={
                        assigneeType === "property" ? properties : customers
                      }
                      sx={{ width: "50%", marginBottom: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                        />
                      )}
                    />
                  )}
                  <Button variant='outlined' onClick={createLabel}>
                    Δημιουργία
                  </Button>
                </FormControl>
              </FormControl>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid component={Paper} item xs={12} sm p={2}>
        <Stack direction={"column"} spacing={3}>
          <Typography variant='h5'>Προβολή υπαρχόντων</Typography>
          {
            labelData && Object.entries(labelData).map(([_, value], index) => {
              return <Grid key={index} gap={1} container flex={1} direction={"column"}>
                <Typography variant='h6' color={"text.secondary"}>
                  {value.label}
                </Typography>
                <Stack direction={"row"} flexWrap={"wrap"}>
                  {value.data &&
                    value.data.map((label: ILabel) => (
                      <Label
                        key={label.id}
                        variant='soft'
                        sx={{
                          borderRadius: 7,
                          color: "white",
                          bgcolor: label.color,
                        }}
                      >
                        {label.name}
                      </Label>
                    ))}
                </Stack>
              </Grid>
            })
          }
        </Stack>
      </Grid>
    </Grid>
  );
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
