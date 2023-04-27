import { IProperties } from "src/types/properties";

import { Box, Typography } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";

interface DetailsSectionProps {
  data: IProperties;
}

const DetailsSection: React.FC<DetailsSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const features = data?.features;

  console.log(details);

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
        <Typography variant="h6">Basic Details</Typography>
      </Box>
      <List>
        <ListItem
          label="Floor"
          value={details?.floor.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Layers"
          value={details?.layers.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Bedrooms"
          value={details?.bedrooms.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Kitchens"
          value={details?.kitchens.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Bathrooms"
          value={details?.bathrooms.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="W/C"
          value={details?.numOfWC.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Living Rooms"
          value={details?.livingRooms.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Store Rooms"
          status={details?.storerooms.toString() || ""}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Attic"
          value={features?.attic}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Playroom"
          value={features?.playRoom}
          align="horizontal"
          divider
        />
        <ListItem
          label="Furnished"
          value={details?.furnished.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Frame Type"
          value={details?.frameType.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Energy Class"
          value={details?.energyClass.toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default DetailsSection;
