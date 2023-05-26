import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import {
  ListItem,
  ListManagerItem,
  ListBooleanItem,
  ListStatusItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";

import { IProperties } from "src/types/properties";
import { IUser } from "src/types/user";

interface BasicSectionProps {
  data: IProperties;
}

const BasicSection: React.FC<BasicSectionProps> = (props) => {
  const { data } = props;

  const details = data?.details;
  const areas = data?.areas;

  const manager: IUser = data?.manager;

  const isAvailable = (state: string) => {
    return state === "Sale" || state === "Rent";
  };

  return (
    <Paper elevation={10} sx={{ overflow: "auto" }}>
      <Box
        sx={{
          px: 2.5,
          py: 1,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Basic Details</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={6}>
          <List>
            <ListStatusItem
              label="Publiced"
              status={isAvailable(data?.state)}
              align="horizontal"
            />
            <ListItem
              label="Category"
              value={data?.category}
              align="horizontal"
            />
            <ListItem label="Code" value={data?.code} align="horizontal" />
            <ListItem
              label="Key Code"
              value={data?.keyCode}
              align="horizontal"
            />
            <ListItem
              label="Price"
              value={data?.price + " € / m^2"}
              align="horizontal"
            />
            <ListItem
              label="House Area"
              value={areas?.covered}
              align="horizontal"
            />
            <ListItem
              label="Plot Area"
              value={areas?.plot}
              align="horizontal"
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem
              label="Renovation Year"
              value={data.construction.yearOfConstruction}
              align="horizontal"
            />
            <ListItem
              label="Monthly Utilities"
              value={data?.averageUtils + " €"}
              align="horizontal"
            />
            <ListManagerItem manager={manager} />
            <ListItem label="State" value={data?.state} align="horizontal" />
            <ListBooleanItem
              label="Rented"
              status={data?.rented}
              align="horizontal"
            />
            <ListItem
              label="Available After"
              value={data?.availableAfter}
              align="horizontal"
            />
            <ListLabelsItem labels={data?.labels} />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicSection;
