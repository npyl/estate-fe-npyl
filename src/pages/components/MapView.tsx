import { Grid } from "@mui/material";
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
    return (<Grid container sx={{ px: 1.5, pb:2 }}spacing={3}>
        <Grid item xs={6} >
            <Map activeMarker={activeMarker} setActiveMarker={setActiveMarker} data={data} />
        </Grid>
        <Grid item container xs={6}>
        {data.map((item, index) => (
         
          <Grid item key={index} xs={12} sm={6} >
                <BookingItem activeMarker={activeMarker||-1} item={item} />
          </Grid>
         
        ))}
        </Grid>
      </Grid>
    )
}
export default MapView