import { List, Typography } from "@mui/material";
import { Box } from "@mui/system";

import {
  ListItem,
  ListManagerItem,
  ListBooleanItem,
  ListStatusItem,
} from "src/components/List";

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
    <>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{data?.description}</Typography>
      </Box>
      <List>
        <ListStatusItem
          label="Publiced"
          status={isAvailable(data?.state)}
          align="horizontal"
          divider
        />
        <ListItem
          label="Category"
          value={data?.category}
          align="horizontal"
          divider
        />
        <ListItem label="Code" value={data?.code} align="horizontal" divider />
        <ListItem
          label="Key Code"
          value={data?.keyCode}
          align="horizontal"
          divider
        />
        <ListItem
          label="Price"
          value={data?.price + " € / m^2"}
          align="horizontal"
          divider
        />
        <ListItem
          label="House Area"
          value={areas?.covered}
          align="horizontal"
          divider
        />
        <ListItem
          label="Plot Area"
          value={areas?.plot}
          align="horizontal"
          divider
        />
        <ListItem
          label="Renovation Year"
          value={data.construction.yearOfConstruction}
          align="horizontal"
          divider
        />
        <ListItem
          label="Monthly Utilities"
          value={data?.averageUtils + " €"}
          align="horizontal"
          divider
        />
        <ListManagerItem manager={manager} />
        <ListItem
          label="State"
          value={data?.state}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Rented"
          status={data?.rented}
          align="horizontal"
          divider
        />
        <ListItem
          label="Available After"
          value={data?.availableAfter}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default BasicSection;
