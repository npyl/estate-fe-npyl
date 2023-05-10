import React from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box } from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";

interface SuitableForProps {
  data: IProperties;
}

const SuitableFor: React.FC<SuitableForProps> = (props) => {
  const { data } = props;
  if (!data) return null;
  const suitableFor = data?.suitableFor;
  if (!suitableFor) return null;

  return (
    <>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Suitable For</Typography>
      </Box>
      <List>
        <ListBooleanItem
          label="Student"
          status={suitableFor?.student}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Cottage"
          status={suitableFor?.cottage}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Tourist Rental"
          status={suitableFor?.touristRental}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Investment"
          status={suitableFor?.investment}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Doctors Office"
          status={suitableFor?.doctorsOffice}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Professional Usage"
          status={suitableFor?.professionalUse}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Renovation"
          status={suitableFor?.renovation}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default SuitableFor;
