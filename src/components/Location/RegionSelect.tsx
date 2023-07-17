import {
	Checkbox,
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import nomoi from "src/json/nomoi.json";

interface IRegionSelectProps {
	region: string;
	onChange: (regionCode: string, lat: number, lng: number) => void;
}

export const RegionSelect = (props: IRegionSelectProps) => {
	const { region, onChange } = props;

	interface optionsType {
		groupName: string;
		options: { value: string; label: string }[];
	}

	const getGroupedOptions = () => {
		const groupedOptions = nomoi.reduce((acc: any, option) => {
			const groupName = option["Parent Name GR"];
			const optionData = { value: option["Area ID"], label: option["Name GR"] };
			if (acc[groupName]) {
				acc[groupName].options.push(optionData);
			} else {
				acc[groupName] = {
					groupName,
					options: [optionData],
				};
			}
			return acc;
		}, {});

		return Object.values(groupedOptions) as optionsType[];
	};

	const renderSelectGroup = (group: any) => {
		const items = group.options.map((option: any) => {
			return (
				<MenuItem key={option.value} value={option.value}>
					<Checkbox checked={region === option.value} />
					{option.label}
				</MenuItem>
			);
		});
		return [<ListSubheader> {group.groupName}</ListSubheader>, items];
	};

	const handleChange = (event: SelectChangeEvent<string>) => {
		const areaID = event.target.value;
		const selectedArea = nomoi!.filter(
			(nomos) => nomos["Area ID"] === areaID
		)[0]; // filter by areaID

		onChange(
			areaID,
			parseFloat(selectedArea.latitude),
			parseFloat(selectedArea.longitude)
		);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Περιοχή</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				value={region}
				onChange={(event) => handleChange(event)}
				renderValue={(selected) => {
					const option = nomoi.find((opt) => opt["Area ID"] === selected);
					return option ? option["Name GR"] : "";
				}}
				input={<OutlinedInput label="Περιοχή" />}
				MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
			>
				{getGroupedOptions().map((group, i) => renderSelectGroup(group))}
			</Select>
		</FormControl>
	);
};
