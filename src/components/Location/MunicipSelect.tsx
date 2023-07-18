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
	regionCode: number;
	municipNameEN: string;
	onChange: (municipNameEN: string, lat: number, lng: number) => void;
}

export const MunicipSelect = (props: IMunicipSelectProps) => {
	const { municipNameEN, regionCode, onChange } = props;

	const [getSubareas, { data: subAreas }] = useGetSubAreasMutation();

	const handleChange = (event: SelectChangeEvent<string>) => {
		const nameEN = event.target.value;
		const selectedSubArea = subAreas!.filter(
			(subArea) => subArea.nameEN === nameEN
		)[0]; // filter by nameEN

		onChange(nameEN, selectedSubArea.latitude, selectedSubArea.longitude);
	};

	useEffect(() => {
		if (!regionCode) return;

		getSubareas([regionCode]);
	}, [regionCode]);

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Δήμος / Συνοικία</InputLabel>
				{subAreas && subAreas.length > 0 && (
					<Select
						labelId="demo-simple-select-label"
						value={municipNameEN}
						onChange={handleChange}
						renderValue={(selected) => {
							const option = subAreas.find((opt) => opt.nameEN === selected);
							return option ? option.nameGR : "";
						}}
						input={<OutlinedInput label="Δήμος / Συνοικία" />}
						MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
					>
						{subAreas.map((option: IGeoLocation) => {
							return (
								<MenuItem key={option.nameEN} value={option.nameEN}>
									<Checkbox checked={option.nameEN === municipNameEN} />
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
