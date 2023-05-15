import {
  Box,
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  Chip,
  ChipProps,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { BlockPicker } from "react-color";
import { Stack } from "@mui/material";

import PropTypes from "prop-types";
import { styled, alpha } from "@mui/system";

import Label from "src/components/label/Label";

const SingleProperty: NextPage = () => {
  const [pickerColor, setPickerColor] = useState("#22194d");
  const [labelName, setLabelName] = useState("Label");
  const [openPicker, setOpenPicker] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChangeComplete = (color: any) => {
    setPickerColor(color.hex);
  };

  return (
    <Box sx={{ width: "100%", paddingY: 3 }}>
      <Paper sx={{ borderBottom: 1, borderColor: "divider", paddingX: 3 }}>
        <Grid container direction={"row"}>
          <Grid item xs={6} p={2}>
            <Typography variant="h5">New</Typography>

            <Grid container direction={"row"}>
              <Grid item xs={6}>
                <Stack
                  p={2}
                  spacing={1}
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    width: { md: "60%", sm: "100%" },
                  }}
                >
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    label="Label Name"
                    value={labelName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLabelName(event.target.value);
                    }}
                  ></TextField>

                  <Stack>
                    <Button
                      onClick={() => {
                        setOpenPicker(!openPicker);
                      }}
                      ref={buttonRef}
                    >
                      Color
                    </Button>

                    {openPicker && buttonRef.current && (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "2",
                          top: `${
                            buttonRef.current.offsetTop +
                            buttonRef.current.offsetHeight +
                            10
                          }px`,
                          left: `${buttonRef.current.offsetLeft + 13}px`,
                        }}
                      >
                        <div
                          style={{
                            position: "fixed",
                          }}
                          onClick={() => {
                            setOpenPicker(false);
                          }}
                        />
                        <BlockPicker
                          color={pickerColor}
                          onChangeComplete={handleChangeComplete}
                        />
                      </div>
                    )}
                  </Stack>
                  <Stack>
                    <Button>Create</Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item>
                <Label
                  variant="soft"
                  sx={{ bgcolor: pickerColor, borderRadius: 7, color: "white" }}
                >
                  {labelName}
                </Label>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Labels</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
