import React from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box, Grid } from "@mui/material";
import { List, ListItem } from "src/components/List";

interface BalconiesSectionProps {
  data: IProperties;
}

const BalconiesSection: React.FC<BalconiesSectionProps> = (props) => {
  const { data } = props;
  const balconies = data?.details.balconies;

  return (
    balconies &&
    balconies.length > 0 && (
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          width: { md: "25%", sm: "100%" },
        }}
      >
        {balconies?.map((balcony, index) => {
          return (
            <Grid
              sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
              item
              key={index}
            >
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">Balcony No.{index + 1}</Typography>
              </Box>
              <List>
                <ListItem
                  label="Area"
                  value={balcony?.area}
                  align="horizontal"
                  divider
                />
                <ListItem
                  label="Side"
                  value={balcony?.side}
                  align="horizontal"
                  divider
                />
              </List>
            </Grid>
          );
        })}
      </Box>
    )
  );
};

export default BalconiesSection;
