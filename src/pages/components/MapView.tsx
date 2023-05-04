import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useAllPropertiesQuery } from "src/services/properties";
import Map from "./Map";
import { BookingItem } from "./MediaCard";

const MapView = () => {
  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }
  const [activeMarker, setActiveMarker] = useState(null);
  return (
    <Box display={"flex"}>
      <Box height={`calc(100vh - 266px)`} width={"50%"}>
        <Map
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          data={data}
        />
      </Box>
      <Grid
        height={`calc(100vh - 282px)`}
        sx={{ overflowY: "auto" }}
        marginY={1}
        container
        spacing={1}
        width={"50%"}
      >
        {data.map((item, index) => (
          <Grid mb={1} key={index} item xs={12} sm={6}>
            <BookingItem activeMarker={activeMarker || -1} item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default MapView;
