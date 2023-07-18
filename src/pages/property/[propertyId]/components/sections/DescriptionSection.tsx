import React from "react";
import { IProperties } from "src/types/properties";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  TextField,
  ListItem,
} from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";

interface DescriptionSectionProps {
  data: IProperties;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
  const { data } = props;

  const details = data?.details;
  const areas = data?.areas;

  const isAvailable = (state: string) => {
    return state === "Sale" || state === "Rent";
  };

  return (
    <Paper elevation={10} sx={{ overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Description</Typography>
      </Box>
      <Divider></Divider>
      <Grid container spacing={1}>
        <Grid item xs={12} order={"row"} padding={0}>
          <Box padding={2}>
            <Box
              padding={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",

                backgroundColor: "#fff58a", // Added this line
                borderRadius: 10,
              }}
            >
              <Typography variant="body1">{data?.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DescriptionSection;
