import {
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetSubAreasMutation } from "src/services/location";
import { IGeoLocation } from "src/types/geolocation";

interface IMunicipSelectProps {
	regionCode: number;
	municipNameEN: string;
	onChange: (municipNameEN: string) => void;
}

export const MunicipSelect = (props: IMunicipSelectProps) => {
	const { municipNameEN, regionCode, onChange } = props;

	const [getSubareas, { data: subAreas }] = useGetSubAreasMutation();

	useEffect(() => {
		if (!regionCode) return;

		getSubareas([regionCode]);
	}, [regionCode]);

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Δήμος / Συνοικία</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					value={municipNameEN}
					onChange={(event) => onChange(event.target.value)}
					renderValue={(selected) => selected}
					input={<OutlinedInput label="Δήμος / Συνοικία" />}
					MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
				>
					{subAreas?.map((option: IGeoLocation) => {
						return (
							<MenuItem key={option.nameEN} value={option.nameEN}>
								<Checkbox checked={option.nameEN === municipNameEN} />
								{option.nameGR}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</>
	);
};
