import { List, Typography } from "@mui/material";
import { Box } from "@mui/system";

import {
  ListStatusItem,
  ListBooleanItem,
  ListItem,
  ListManagerItem,
} from "src/components/List";

import { IProperties } from "src/types/properties";
import { IUser } from "src/types/user";

interface BasicSectionProps {
  data: IProperties;
}

const BasicSection: React.FC<BasicSectionProps> = (props) => {
  const { data } = props;

  const details = data?.propertyDetail;
  const areas = details?.areas;

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
          label="Availability"
          status={isAvailable(data?.state)}
          align="horizontal"
          divider
        />
        <ListItem
          label="Category"
          status={data?.category}
          align="horizontal"
          divider
        />
        <ListItem
          label="Code"
          status={data?.code.toString()}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Has Key"
          status={data?.hasKey}
          align="horizontal"
          divider
        />
        <ListItem
          label="Price"
          status={data?.price.toString() + " € / m^2" || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="House Area"
          status={areas?.covered.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Plot Area"
          status={areas?.plot.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Renovation Year"
          status={details?.renovationYear.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Monthly Utilities"
          status={details?.avgUtils.toString() + " €" || ""}
          align="horizontal"
          divider
        />
        <ListManagerItem manager={manager} />
        <ListItem
          label="Availability"
          status={data?.state.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Misthomeno"
          status="TODO: misthomeno"
          align="horizontal"
          divider
        />
        <ListItem
          label="Available After"
          status={data?.availableAfter?.toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default BasicSection;
