import {
	Box,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";

import * as React from "react";
import DateFieldStyled from "./DateFieldStyled";
import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
	selectArea,
	selectAuction,
	selectBuildable,
	selectCode,
	selectAvailableAfter,
	selectCurrentRentPrice,
	selectDebatablePrice,
	selectEstimatedRentPrice,
	selectKeyCode,
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
	setBuildable,
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
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";
import { LabelCreate } from "src/components/label";

import OnlyNumbersInput from "src/components/OnlyNumbers";

import { useLazyGetPropertyLabelsQuery } from "src/services/properties";
import { ILabel } from "src/types/label";
import { useEffect } from "react";

import {
	useAssignLabelToPropertyWithIDMutation,
	useCreateLabelForPropertyWithIDMutation,
	useDeleteLabelForPropertyWithIdMutation,
	useGetLabelsQuery,
} from "src/services/labels";
import { useRouter } from "next/router";
import { KeyCodeField } from "./components/KeyCodeField";
import { CodeField } from "./components/CodeField";

const BasicForLandSection: React.FC<any> = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { propertyId } = router.query;
	if (!propertyId) return;

	const { data } = useAllGlobalsQuery();
	const enums: IGlobalProperty = data?.property as IGlobalProperty;

	const { data: labels } = useGetLabelsQuery();
	const propertyLabels = labels?.propertyLabels || [];

	// labels
	const [getLabels, { data: assignedLabels }] = useLazyGetPropertyLabelsQuery();
	const [assignLabel] = useAssignLabelToPropertyWithIDMutation();
	const [createAndAssignLabel] = useCreateLabelForPropertyWithIDMutation();
	const [deleteLabel] = useDeleteLabelForPropertyWithIdMutation();

	const code = useSelector(selectCode);
	const owner = useSelector(selectOwner);
	const manager = useSelector(selectManager);
	const currentRentPrice = useSelector(selectCurrentRentPrice);
	const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
	const state = useSelector(selectState);
	const price = useSelector(selectPrice);
	const keyCode = useSelector(selectKeyCode);
	const area = useSelector(selectArea);
	const buildable = useSelector(selectBuildable);
	const plotArea = useSelector(selectPlotArea);
	const rented = useSelector(selectRented);
	const availableAfter = useSelector(selectAvailableAfter);
	const rentalPeriodStart = useSelector(selectRentalPeriodStart);
	const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
	const auction = useSelector(selectAuction);
	const debatablePrice = useSelector(selectDebatablePrice);
	const stateEnum = enums?.state;

	useEffect(() => {
		if (!propertyId) return;
		revalidate();
	}, [propertyId]);

	const revalidate = () => {
		// TODO: improve this by revalidating automatically (invalidating a tag)
		getLabels(+propertyId!);
	};

	const handleLabelClick = (label: ILabel) =>
		label.id &&
		assignLabel({ propertyId: +propertyId!, labelId: label.id }).then(() =>
			revalidate()
		);
	const handleLabelCreate = (label: ILabel) =>
		createAndAssignLabel({ propertyId: +propertyId!, labelBody: label }).then(
			() => revalidate()
		);
	const handleLabelRemove = (index: number) =>
		assignedLabels &&
		assignedLabels[index] &&
		assignedLabels[index].id &&
		deleteLabel({
			propertyId: +propertyId!,
			labelId: assignedLabels[index].id!,
		}).then(() => revalidate());

	// get list of owners & managers
	const { data: owners } = useAllCustomersQuery();
	const { data: managers } = useAllUsersQuery();
	if (!enums) return null;

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
						<CodeField
							code={code}
							onChange={(event) => dispatch(setCode(event.target.value))}
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
								owners?.map((option, index) => (
									<MenuItem key={index} value={option.id}>
										{option.email}
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
										{option.email}
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
							adornment="m²"
							onChange={(value) => {
								dispatch(setArea(value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Plot Area"
							value={plotArea}
							adornment="m²"
							onChange={(value) => {
								dispatch(setPlotArea(value));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Price"
							value={price}
							adornment="€"
							onChange={(value) => {
								dispatch(setPrice(value));
							}}
						/>
					</Grid>

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
						<KeyCodeField
							keyCode={keyCode}
							onChange={(event) => dispatch(setKeyCode(event.target.value))}
						/>
					</Grid>
					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Current Rent Price"
							value={currentRentPrice}
							adornment="€"
							onChange={(value) => {
								dispatch(setCurrentRentPrice(value));
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<OnlyNumbersInput
							label="Estimated Rent Price"
							value={estimatedRentPrice}
							adornment="€"
							onChange={(value) => {
								dispatch(setEstimatedRentPrice(value));
							}}
						/>
					</Grid>

					<Grid item xs={6}>
						<LabelCreate
							existingLabels={propertyLabels}
							assignedLabels={assignedLabels || []}
							newLabels={[]}
							onLabelClick={handleLabelClick}
							onLabelCreate={handleLabelCreate}
							onRemoveAssignedLabel={handleLabelRemove}
							onRemoveNewLabel={() => {}}
						/>
					</Grid>

					<Grid item xs={12} padding={1}>
						<Grid
							container
							spacing={0}
							sx={{
								padding: "10px",
								border: "1px solid #000000",
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
									{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
									<Grid item xs={6}>
										{/* <DemoContainer components={["DateField"]}> */}
										<DateFieldStyled
											label="Available After:"
											value={availableAfter}
											onChange={(value) => {
												dispatch(setAvailableAfter(value));
											}}
											disabled={!rented} // Disable the field if "rented" is unchecked
										/>
										{/* </DemoContainer> */}
									</Grid>

									<Grid item xs={6}>
										{/* <DemoContainer components={["DateField"]}> */}
										<DateFieldStyled
											label="Rental Period Start"
											value={rentalPeriodStart}
											onChange={(value) => {
												dispatch(setRentalPeriodStart(value));
											}}
											disabled={!rented} // Disable the field if "rented" is unchecked
										/>
										{/* </DemoContainer> */}
									</Grid>
									<Grid item xs={6}>
										{/* <DemoContainer components={["DateField"]}> */}
										<DateFieldStyled
											label="Rental Period End"
											value={rentalPeriodEnd}
											onChange={(value) => {
												dispatch(setRentalPeriodEnd(value));
											}}
											disabled={!rented} // Disable the field if "rented" is unchecked
										/>
										{/* </DemoContainer> */}
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
							value={buildable}
							checked={buildable}
							onChange={(
								event: React.ChangeEvent<unknown>,
								checked: boolean
							) => {
								dispatch(setBuildable(checked));
							}}
							sx={{ cursor: "default" }}
							color="primary"
							inputProps={{ "aria-label": "Buildable" }}
						/>
						<Typography variant="body1" sx={{ ml: 0 }}>
							Buildable
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
		</Paper>
	);
};

export default BasicForLandSection;
