import { IProperties } from "src/types/properties";

import { Box, Typography } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";

interface DetailsSectionProps {
  data: IProperties;
}

const DetailsSection: React.FC<DetailsSectionProps> = (props) => {
  const { data } = props;
  const details = data?.details;

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
        <Typography variant='h6'>Basic Details</Typography>
      </Box>
      <List>
        <ListItem
          label='Floor'
          value={details?.floor}
          align='horizontal'
          divider
        />
        <ListItem
          label='Layers'
          value={details?.layers}
          align='horizontal'
          divider
        />
        <ListItem
          label='Bedrooms'
          value={details?.bedrooms}
          align='horizontal'
          divider
        />
        <ListItem
          label='Kitchens'
          value={details?.kitchens}
          align='horizontal'
          divider
        />
        <ListItem
          label='Bathrooms'
          value={details?.bathrooms}
          align='horizontal'
          divider
        />
        <ListItem label='W/C' value={details?.wc} align='horizontal' divider />
        <ListItem
          label='Living Rooms'
          value={details?.livingrooms}
          align='horizontal'
          divider
        />
        <ListItem
          label='Orientation'
          value={details?.orientation}
          align='horizontal'
          divider
        />
        <ListBooleanItem
          label='Floor Apartment'
          status={details?.floorApartment}
          align='horizontal'
          divider
        />
        <ListBooleanItem
          label='Penthouse'
          status={details?.penthouse}
          align='horizontal'
          divider
        />
        <ListBooleanItem
          label='Storeroom'
          status={details?.storeroom}
          align='horizontal'
          divider
        />
        <ListBooleanItem
          label='Attic'
          status={details?.attic}
          align='horizontal'
          divider
        />
        <ListBooleanItem
          label='Playroom'
          status={details.playroom}
          align='horizontal'
          divider
        />
        <ListItem
          label='View Type'
          value={details.viewType}
          align='horizontal'
          divider
        />
        <ListItem
          label='Zone Type'
          value={details.zoneType}
          align='horizontal'
          divider
        />
        <ListItem
          label='Land Use'
          value={details.landUse}
          align='horizontal'
          divider
        />
        <ListItem
          label='Accessibility'
          value={details.accessibility}
          align='horizontal'
          divider
        />
      </List>
    </>
  );
};

export default DetailsSection;
