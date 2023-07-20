import {
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useGetSubAreasMutation } from "src/services/location";
import { IGeoLocation } from "src/types/geolocation";

interface IMunicipSelectProps {
	regionCode: string;
	municipCode: string;
	onChange: (municipCode: string, lat: number, lng: number) => void;
}

export const MunicipSelect = (props: IMunicipSelectProps) => {
	const { municipCode, regionCode, onChange } = props;

	const [getSubareas, { data: subAreas }] = useGetSubAreasMutation();

	const handleChange = (event: SelectChangeEvent<string>) => {
		const municipCode = event.target.value;
		const selectedSubArea = subAreas!.filter(
			(subArea) => subArea.areaID.toString() === municipCode
		)[0]; // filter by nameEN

		onChange(municipCode, selectedSubArea.latitude, selectedSubArea.longitude);
	};

	useEffect(() => {
		if (!regionCode) return;

		getSubareas([+regionCode]);
	}, [regionCode]);

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Δήμος / Συνοικία</InputLabel>
				{subAreas && subAreas.length > 0 && (
					<Select
						labelId="demo-simple-select-label"
						value={municipCode}
						onChange={handleChange}
						renderValue={(selected) => {
							const option = subAreas.find(
								(opt) => opt.areaID.toString() === selected
							);
							return option ? option.nameGR : "";
						}}
						input={<OutlinedInput label="Δήμος / Συνοικία" />}
						MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
					>
						{subAreas.map((option: IGeoLocation) => {
							return (
								<MenuItem key={option.areaID} value={option.areaID.toString()}>
									<Checkbox
										checked={option.areaID.toString() === municipCode}
									/>
									{option.nameGR}
								</MenuItem>
							);
						})}
					</Select>
				)}
			</FormControl>
		</>
	);
};
