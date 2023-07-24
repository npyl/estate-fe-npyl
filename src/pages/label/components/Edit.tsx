import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SliderPicker } from "react-color";
import { Label } from "src/components/label";
import { IEditProps } from "./types";

export const Edit = (props: {
	editedLabel: IEditProps;
	cancelEdit: () => void;
	editLabel: (editedLabel: IEditProps) => void;
}) => {
	const { editedLabel, cancelEdit, editLabel } = props;

	const [pickerColor, setPickerColor] = useState(editedLabel.color);
	const [labelName, setLabelName] = useState(editedLabel.name);

	const [error, setError] = useState("");
	const handleChangeComplete = (color: any) => {
		setPickerColor(color.hex);
	};

	const handleCreateLabel = () => {
		if (!labelName) {
			setError("Το όνομα της ετικέτας είναι υποχρεωτικό");
			return;
		}

		editLabel({
			id: editedLabel.id,
			name: labelName,
			color: pickerColor,
			resource: editedLabel.resource,
		});
	};

	return (
		<>
			<Grid component={Paper} item xs={12} sm={4} p={2}>
				<Typography variant="h5">Μετατροπή</Typography>
				<Stack spacing={3} mt={2}>
					<Stack spacing={1}>
						<FormControl>
							<FormLabel id="demo-controlled-radio-buttons-group">
								<Typography
									variant="subtitle2"
									sx={{ color: "text.secondary" }}
								>
									Εισάγετε όνομα:
								</Typography>
							</FormLabel>
							<Stack direction={"row"} spacing={1}>
								<TextField
									id="outlined-select-currency"
									value={labelName}
									placeholder="Νέα Ετικέτα"
									error={!!error}
									helperText={error}
									onFocus={(event) => {
										(event.target.placeholder = ""), setError("");
									}}
									onBlur={(event) => (event.target.placeholder = "Νέα Ετικέτα")}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										setLabelName(event.target.value);
									}}
								/>
							</Stack>
							<Box m={4}>
								<SliderPicker
									color={pickerColor}
									onChangeComplete={handleChangeComplete}
								/>
							</Box>
							<FormControl>
								<Stack direction={"row"} spacing={3}>
									<FormLabel id="demo-controlled-radio-buttons-group">
										<Typography
											variant="subtitle2"
											sx={{ color: "text.secondary" }}
										>
											Προεπισκόπιση:
										</Typography>
									</FormLabel>
									<Label
										variant="soft"
										sx={{
											bgcolor: pickerColor,
											borderRadius: 7,
											color: "white",
										}}
									>
										{labelName || "Νέα Ετικέτα"}
									</Label>
								</Stack>
								<Stack
									direction={"row"}
									spacing={1}
									alignSelf={"center"}
									mt={2}
								>
									<Button variant="outlined" onClick={cancelEdit}>
										Ακύρωση
									</Button>
									<Button variant="contained" onClick={handleCreateLabel}>
										Μετατροπή
									</Button>
								</Stack>
							</FormControl>
						</FormControl>
					</Stack>
				</Stack>
			</Grid>
		</>
	);
};
