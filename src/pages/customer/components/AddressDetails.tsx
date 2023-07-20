import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import * as React from "react";

import {
	selectCity,
	selectCountry,
	selectNumber,
	selectRegion,
	selectStreet,
	selectZipCode,
	setCity,
	setCountry,
	setNumber,
	setRegion,
	// setters
	setStreet,
	setZipCode,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";

const AddressDetails: React.FC<any> = (props) => {
	const street = useSelector(selectStreet);
	const number = useSelector(selectNumber);
	const city = useSelector(selectCity);
	const zipCode = useSelector(selectZipCode);
	const region = useSelector(selectRegion);
	const country = useSelector(selectCountry);

	const dispatch = useDispatch();

	return (
		<Paper
			elevation={10}
			sx={{
				overflow: "auto",
				padding: 0.5,
			}}
		>
			<Box
				sx={{
					px: 3,
					py: 1.5,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Typography variant="h6">Address Details</Typography>
			</Box>

			<Grid item xs={12} padding={1}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Street"
							value={street}
							onChange={(e) => {
								dispatch(setStreet(e.target.value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Number"
							value={number}
							onChange={(value) => {
								dispatch(setNumber(value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="City"
							value={city}
							onChange={(e) => {
								dispatch(setCity(e.target.value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Zip Code"
							value={zipCode}
							onChange={(value) => {
								dispatch(setZipCode(value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Region"
							value={region}
							onChange={(e) => {
								dispatch(setRegion(e.target.value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-controlled"
							label="Country"
							value={country}
							onChange={(e) => {
								dispatch(setCountry(e.target.value));
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};
export default AddressDetails;
