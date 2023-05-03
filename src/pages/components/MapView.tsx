import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useAllPropertiesQuery } from "src/services/properties";
import { BookingItem } from "./MediaCard";

const MapView = () => {
  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }
  const [activeMarker, setActiveMarker] = useState(null);
  return (
    <Box display={"flex"} gap={2}>
      {/* <Box>
        <Map
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          data={data}
        />
      </Box> */}
      <Stack
        flexWrap='wrap'
        direction={"row"}
        width={"50%"}
        justifyContent={"space-between"}
      >
        {data.map((item, index) => (
          <>
            <Box sx={{ width: `calc(50% - 10px)` }}>
              <BookingItem activeMarker={activeMarker || -1} item={item} />
            </Box>
          </>
        ))}
      </Stack>
    </Box>
  );
};
export default MapView;
