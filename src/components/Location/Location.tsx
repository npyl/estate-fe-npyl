import { Grid, Paper, SelectChangeEvent, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import Map from "../Map/Map";

import { ILocationPOST } from "src/types/location";
import { RegionSelect } from "./RegionSelect";
import { MunicipSelect } from "./MunicipSelect";

interface ILocationSectionProps extends ILocationPOST {
	// redux setters
	setStreet: ActionCreatorWithPayload<any, string>;
	setNumber: ActionCreatorWithPayload<any, string>;
	setCity: ActionCreatorWithPayload<any, string>;
	setComplex: ActionCreatorWithPayload<any, string>;
	setZipCode: ActionCreatorWithPayload<any, string>;
	setRegion: ActionCreatorWithPayload<any, string>;
	setCountry: ActionCreatorWithPayload<any, string>;
}

const LocationSection = (props: ILocationSectionProps) => {
	const dispatch = useDispatch();

	const [activeMarker, setActiveMarker] = useState(null);
	const [region, setRegion] = useState("");
	const [municipNameEN, setMunicipNameEN] = useState("");

	const {
		street,
		number,
		// city,
		complex,
		zipCode,
		// region,
		country,

		setStreet,
		setNumber,
		// setCity,
		setComplex,
		setZipCode,
		// setRegion,
		setCountry,
	} = props;

	const handleChange = (
		setter: any,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatch(setter(event.target.value));
	};

	const handleRegionChange = (event: SelectChangeEvent<string>) => {
		setRegion(event.target.value);
	};
	const handleMunicipChange = (municipNameEN: string) => {
		setMunicipNameEN(municipNameEN);
	};

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		console.log(event.latLng?.lat());
	};

	return (
		<Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
			<Box
				sx={{
					px: 3,
					py: 1.5,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Typography variant="h6">Location</Typography>
			</Box>

			<Grid item xs={12} padding={1}>
				<Box display={"flex"} pb={2}>
					<Box height={`50vh`} width={"100%"}>
						<Map
							drawing={false}
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
							id="outlined-controlled"
							label="Country"
							value={country}
							onChange={(event) => handleChange(setCountry, event)}
						/>
					</Grid>

					<Grid item xs={12}>
						<Grid container direction={"row"} spacing={2}>
							<Grid item xs={6}>
								<RegionSelect region={region} onChange={handleRegionChange} />
							</Grid>
							<Grid item xs={6}>
								<MunicipSelect
									regionCode={parseInt(region)}
									municipNameEN={municipNameEN}
									onChange={handleMunicipChange}
								/>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Street"
							value={street}
							onChange={(event) => handleChange(setStreet, event)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Number"
							value={number}
							onChange={(event) => handleChange(setNumber, event)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Complex"
							value={complex}
							onChange={(event) => handleChange(setComplex, event)}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Zip Code"
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
