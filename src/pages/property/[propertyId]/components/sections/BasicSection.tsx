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
          value={data?.category}
          align="horizontal"
          divider
        />
        <ListItem
          label="Code"
          value={data?.code.toString()}
          align="horizontal"
          divider
        />
        <ListItem
          label="Key Id"
          value={data?.keyId}
          align="horizontal"
          divider
        />
        <ListItem
          label="Price"
          value={data?.price.toString() + " € / m^2" || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="House Area"
          value={areas?.covered.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Plot Area"
          value={areas?.plot.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Renovation Year"
          value={details?.renovationYear.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Monthly Utilities"
          value={details?.avgUtils.toString() + " €" || ""}
          align="horizontal"
          divider
        />
        <ListManagerItem manager={manager} />
        <ListItem
          label="Availability"
          value={data?.state.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Misthomeno"
          value="TODO: misthomeno"
          align="horizontal"
          divider
        />
        <ListItem
          label="Available After"
          value={data?.availableAfter?.toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default BasicSection;
