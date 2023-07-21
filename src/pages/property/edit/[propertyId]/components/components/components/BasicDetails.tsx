import {
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Box,
	Typography,
} from "@mui/material";

import DateFieldStyled from "./DateFieldStyled"; // adjust the path based on your directory structure

import * as React from "react";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";

import "react-day-picker/dist/style.css";

import {
	selectArea,
	selectAuction,
	selectAvgUtils,
	selectCode,
	selectCurrentRentPrice,
	selectDebatablePrice,
	selectEstimatedRentPrice,
	selectKeyCode,
	selectLabelIDs,
	selectManager,
	selectOwner,
	selectPlotArea,
	selectPrice,
	selectRentalPeriodEnd,
	selectRentalPeriodStart,
	selectRented,
	selectState,
	setArea,
	setAuction,
	setAvailableAfter,
	setAvgUtils,
	setCode,
	setCurrentRentPrice,
	setDebatablePrice,
	setEstimatedRentPrice,
	setKeyCode,
	setManager,
	setOwner,
	setPlotArea,
	setPrice,
	setRentalPeriodEnd,
	setRentalPeriodStart,
	setRented,
	setState,
} from "src/slices/property";

import { IGlobalProperty } from "src/types/global";
import { ILabel } from "src/types/label";

import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";

import { LabelCreate } from "src/components/label";

// Property Slice
import { removeLabel as removeAssignedLabel } from "src/slices/property";
import {
	useAssignLabelToPropertyWithIDMutation,
	useCreateLabelForPropertyWithIDMutation,
	useDeleteLabelForPropertyWithIdMutation,
	useGetLabelsQuery,
} from "src/services/labels";

import { selectAvailableAfter } from "src/slices/property";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ICustomer } from "src/types/customer";
import { useLazyCheckCodeExistsQuery } from "src/services/properties";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { label } from "yet-another-react-lightbox";

const BasicSection: React.FC<any> = () => {
	const router = useRouter();
	const { propertyId } = router.query;

	const { data } = useAllGlobalsQuery();
	const enums: IGlobalProperty = data?.property as IGlobalProperty;

	// get list of owners, managers & labels
	const { data: owners } = useAllCustomersQuery();
	const { data: managers } = useAllUsersQuery();
	const { data: labels } = useGetLabelsQuery();
	const propertyLabels = labels?.propertyLabels;

	// labels
	const [assignLabel] = useAssignLabelToPropertyWithIDMutation();
	const [createAndAssignLabel] = useCreateLabelForPropertyWithIDMutation();
	const [deleteLabel] = useDeleteLabelForPropertyWithIdMutation();

	const [checkCode, { data: codeExists, isSuccess: chechCodeSuccess }] =
		useLazyCheckCodeExistsQuery();

	const dispatch = useDispatch();

	const [codeError, setCodeError] = useState("");

	const currentDate = new Date();
	const code = useSelector(selectCode);
	const owner = useSelector(selectOwner);
	const manager = useSelector(selectManager);
	const currentRentPrice = useSelector(selectCurrentRentPrice);
	const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

	const price = useSelector(selectPrice);
	const keyCode = useSelector(selectKeyCode);
	const avgUtils = useSelector(selectAvgUtils);
	const area = useSelector(selectArea);
	const plotArea = useSelector(selectPlotArea);
	const rented = useSelector(selectRented);
	const availableAfter = useSelector(selectAvailableAfter);
	const rentalPeriodStart = useSelector(selectRentalPeriodStart);
	const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
	const auction = useSelector(selectAuction);
	const debatablePrice = useSelector(selectDebatablePrice);
	const state = useSelector(selectState);
	const stateEnum = enums?.state;

	const labelIDs = useSelector(selectLabelIDs);

	const assignedLabels = useMemo(() => {
		if (!labelIDs || !propertyLabels) return [];

		return (
			labelIDs
				.filter((labelID) => labelID)
				.map((labelID, index) => {
					// get label object with id
					return propertyLabels.find((label) => label.id === labelID)!;
				}) || []
		);
	}, [labelIDs, propertyLabels]);

	useEffect(() => {
		if (codeExists === null || !chechCodeSuccess) return;

		setCodeError(codeExists ? "Code already exists!" : "");
	}, [codeExists, chechCodeSuccess]);

	const handleLabelClick = (label: ILabel) =>
		label.id && assignLabel({ propertyId: +propertyId!, labelId: label.id });
	const handleLabelCreate = (label: ILabel) =>
		createAndAssignLabel({ propertyId: +propertyId!, labelBody: label });
	const handleLabelRemove = (index: number) =>
		labelIDs[index] &&
		deleteLabel({ propertyId: +propertyId!, labelId: labelIDs[index]! });

	const handleDateChange = (
		setter: ActionCreatorWithPayload<any, string>,
		date: Date | null
	) => {
		if (!date || !setter) return; // we don't need null

		dispatch(setter(date.toISOString()));
	};

	const handleCodeChange = (code: string) => {
		dispatch(setCode(code));
		checkCode(code);
	};

	if (!enums || !propertyLabels || !propertyId) return null;

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
				<Typography variant="h6">Basic Details</Typography>
			</Box>

			<Grid item xs={12} padding={1}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-start-adornment"
							label="Code"
							value={code}
							onChange={(event) => handleCodeChange(event.target.value)}
							error={!!codeError}
							helperText={codeError}
							size="small"
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-start-adornment"
							select
							label="Owner"
							value={owner}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								dispatch(setOwner(event.target.value));
							}}
							size="small"
						>
							{owners && owners.length > 0 ? (
								owners?.map((option: ICustomer, index: number) => (
									<MenuItem key={index} value={option.id}>
										{`${option.firstName} ${option.lastName}`}
									</MenuItem>
								))
							) : (
								<MenuItem value={""}></MenuItem>
							)}
						</TextField>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-start-adornment"
							select
							label="Manager"
							value={manager}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								dispatch(setManager(event.target.value));
							}}
							size="small"
						>
							{managers && managers.length > 0 ? (
								managers?.map((option, index) => (
									<MenuItem key={index} value={option.id}>
										{`${option.firstName} ${option.lastName}`}
									</MenuItem>
								))
							) : (
								<MenuItem value={""}></MenuItem>
							)}
						</TextField>
					</Grid>

					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">State</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={state}
								label="State"
								onChange={(e) => {
									dispatch(setState(e.target.value));
								}}
							>
								{stateEnum.map((item, index) => {
									return (
										<MenuItem key={index} value={item}>
											{item}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Area"
							value={area}
							onChange={(value) => {
								dispatch(setArea(value));
							}}
							adornment="m²"
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Plot Area"
							value={plotArea}
							onChange={(value) => {
								dispatch(setPlotArea(value));
							}}
							adornment="m²"
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Price"
							value={price}
							onChange={(value) => {
								dispatch(setPrice(value));
							}}
							adornment="€"
						/>
					</Grid>

					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Average Utils"
							value={avgUtils}
							onChange={(value) => {
								dispatch(setAvgUtils(value));
							}}
							adornment="€/Month"
						/>
					</Grid>
					<Grid item xs={6}>
						<LabelCreate
							existingLabels={propertyLabels}
							assignedLabels={assignedLabels}
							newLabels={[]}
							onLabelClick={handleLabelClick}
							onLabelCreate={handleLabelCreate}
							onRemoveAssignedLabel={handleLabelRemove}
							onRemoveNewLabel={() => {}}
						/>
					</Grid>

					<Grid item xs={6}>
						<TextField
							fullWidth
							id="outlined-start-adornment"
							label="Key Code"
							value={keyCode}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								dispatch(setKeyCode(event.target.value));
							}}
							inputProps={{
								style: {
									height: "8px",
								},
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Estimated Rent Price"
							value={estimatedRentPrice}
							onChange={(value) => {
								dispatch(setEstimatedRentPrice(value));
							}}
							adornment="€"
						/>
					</Grid>
					<Grid
						item
						xs={3}
						flexDirection="row"
						sx={{ display: "inline-flex", alignItems: "center" }}
					>
						<Checkbox
							value={debatablePrice}
							checked={debatablePrice}
							onChange={(
								event: React.ChangeEvent<unknown>,
								checked: boolean
							) => {
								dispatch(setDebatablePrice(checked));
							}}
							sx={{ cursor: "default" }}
							color="primary"
							inputProps={{ "aria-label": "Floor Heating Checkbox" }}
						/>
						<Typography variant="body1" sx={{ ml: 0 }}>
							Debatable Price
						</Typography>
					</Grid>

					<Grid
						item
						xs={2}
						flexDirection="row"
						sx={{ display: "inline-flex", alignItems: "center" }}
					>
						<Checkbox
							value={auction}
							checked={auction}
							onChange={(
								event: React.ChangeEvent<unknown>,
								checked: boolean
							) => {
								dispatch(setAuction(checked));
							}}
							sx={{ cursor: "default" }}
							color="primary"
							inputProps={{ "aria-label": "Floor Heating Checkbox" }}
						/>
						<Typography variant="body1" sx={{ ml: 0 }}>
							Auction
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} padding={1}>
				<Grid
					container
					spacing={0}
					sx={{
						padding: "10px",
						border: "1px solid #CCCCCC",
						borderRadius: "10px",
					}}
				>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid
								item
								xs={6}
								flexDirection="row"
								sx={{ display: "inline-flex", alignItems: "center" }}
							>
								<Checkbox
									id="outlined-controlled"
									value={rented}
									checked={rented}
									onChange={(
										event: React.ChangeEvent<unknown>,
										checked: boolean
									) => {
										dispatch(setRented(checked));
									}}
									sx={{ cursor: "default" }}
									color="primary"
									inputProps={{ "aria-label": "Elevator" }}
								/>
								<Typography variant="body1" sx={{ ml: 0 }}>
									Rented
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<DateFieldStyled
									label="Available After:"
									value={
										availableAfter ? new Date(availableAfter) : currentDate
									}
									onChange={(value: any) => {
										handleDateChange(setAvailableAfter, value);
									}}
									disabled={!rented} // Disable the field if "rented" is unchecked
									sx={{ width: "100%" }} // Add custom styles to make it full width
								/>
							</Grid>

							<Grid item xs={6}>
								<DateFieldStyled
									label="Rental Period Start"
									value={
										rentalPeriodStart
											? new Date(rentalPeriodStart)
											: currentDate
									}
									onChange={(value: any) => {
										handleDateChange(setRentalPeriodStart, value);
									}}
									disabled={!rented} // Disable the field if "rented" is unchecked
									sx={{ width: "100%" }} // Add custom styles to make it full width
								/>
							</Grid>
							<Grid item xs={6}>
								<DateFieldStyled
									label="Rental Period End"
									value={
										rentalPeriodEnd ? new Date(rentalPeriodEnd) : currentDate
									}
									onChange={(value: any) => {
										handleDateChange(setRentalPeriodEnd, value);
									}}
									disabled={!rented} // Disable the field if "rented" is unchecked
									sx={{ width: "100%" }} // Add custom styles to make it full width
								/>
							</Grid>
							<Grid item xs={6}>
								<OnlyNumbersInput
									label="Current Rent Price"
									value={currentRentPrice}
									onChange={(value) => {
										dispatch(setCurrentRentPrice(value));
									}}
									adornment="€"
									disabled={!rented}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default BasicSection;
