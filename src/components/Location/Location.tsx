import { Divider, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import Map, { IMapMarker, IMapCoordinates, IMapAddress } from "../Map/Map";

import { ILocationPOST } from "src/types/location";
import { RegionSelect } from "./RegionSelect";
import { MunicipSelect } from "./MunicipSelect";
import { useGetClosestQuery } from "src/services/location";
import { useTranslation } from "react-i18next";

interface ILocationSectionProps extends ILocationPOST {
  // redux setters
  setStreet: ActionCreatorWithPayload<any, string>;
  setNumber: ActionCreatorWithPayload<any, string>;
  setCity: ActionCreatorWithPayload<any, string>;
  setZipCode: ActionCreatorWithPayload<any, string>;
  setRegion: ActionCreatorWithPayload<any, string>;
  setCountry: ActionCreatorWithPayload<any, string>;
  setLatitude: ActionCreatorWithPayload<any, string>;
  setLongitude: ActionCreatorWithPayload<any, string>;
}

const LocationSection = (props: ILocationSectionProps) => {
  const {
    street,
    number,
    city,
    zipCode,
    region,
    country,

    setStreet,
    setNumber,
    setCity,
    setZipCode,
    setRegion,
    setCountry,
    setLatitude,
    setLongitude,
  } = props;

  const dispatch = useDispatch();

  const [activeMarker, setActiveMarker] = useState(null);
  const [mainMarker, setMainMarker] = useState<IMapMarker>({
    lat: 37.98381,
    lng: 23.727539,
    address: "",
    main: true,
  });

  const nullCoord = -1;

  const [onDragEndCoord, setOnDragEndCoord] = useState<IMapCoordinates>({
    lat: nullCoord,
    lng: nullCoord,
  });
  const { t } = useTranslation();
  const closest = useGetClosestQuery(
    { latitude: onDragEndCoord.lat, longitude: onDragEndCoord.lng },
    {
      skip:
        onDragEndCoord.lat === nullCoord && onDragEndCoord.lng === nullCoord,
    }
  ).data;

  const updateMainMarkerCoordinates = (lat: number, lng: number) => {
    let newMarker = mainMarker;
    newMarker.lat = lat;
    newMarker.lng = lng;
    setMainMarker(newMarker);

    // update slice
    // dispatch(setLatitude(lat));
    // dispatch(setLongitude(lng));
  };

  const handleChange = (
    setter: any,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setter(event.target.value));
  };

  const handleRegionChange = (regionCode: string, lat: number, lng: number) => {
    updateMainMarkerCoordinates(lat, lng);

    // update slice
    dispatch(setRegion(regionCode));
  };
  const handleMunicipChange = (
    municipCode: string,
    lat: number,
    lng: number
  ) => {
    updateMainMarkerCoordinates(lat, lng);

    // update slice
    dispatch(setCity(municipCode));
  };

  //
  // Map
  //
  const handleMapClick = (lat: number, lng: number, address: IMapAddress) => {
    if (!lat || !lng) return;

    setOnDragEndCoord({ lat, lng });
    updateMainMarkerCoordinates(lat, lng);

    // update slice
    dispatch(setStreet(address.street));
    dispatch(setNumber(address.number));
    dispatch(setZipCode(address.zipCode));
  };
  const handleMarkerDragEnd = (
    marker: IMapMarker,
    newLat: number,
    newLng: number,
    address: IMapAddress
  ) => {
    if (!marker || marker !== mainMarker) return; // we only care about mainMarker drag

    setOnDragEndCoord({ lat: newLat, lng: newLng });
    updateMainMarkerCoordinates(newLat, newLng);

    // update slice
    dispatch(setStreet(address.street));
    dispatch(setNumber(address.number));
    dispatch(setZipCode(address.zipCode));
  };

  useEffect(() => {
    if (!closest) return;

    // update slice
    dispatch(setRegion(closest.parentID.toString()));
    dispatch(setCity(closest.areaID.toString()));
  }, [closest]);

  return (
    <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">{t("Location")}</Typography>
      </Box>
      <Divider></Divider>
      <Grid item xs={12} padding={1}>
        <Box display={"flex"} pb={2}>
          <Box height={`50vh`} width={"100%"}>
            <Map
              drawing={false}
              mainMarker={mainMarker}
              onDragEnd={handleMarkerDragEnd}
              onClick={handleMapClick}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label={t("Country")}
              value={country}
              onChange={(event) => handleChange(setCountry, event)}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container direction={"row"} spacing={2}>
              <Grid item xs={6}>
                <RegionSelect
                  regionCode={region}
                  onChange={handleRegionChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MunicipSelect
                  regionCode={region}
                  municipCode={city}
                  onChange={handleMunicipChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label={t("Street")}
              value={street}
              onChange={(event) => handleChange(setStreet, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={t("Number")}
              value={number}
              onChange={(event) => handleChange(setNumber, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Zip Code")}
              value={zipCode}
              onChange={(value) => dispatch(setZipCode(value))}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default LocationSection;
