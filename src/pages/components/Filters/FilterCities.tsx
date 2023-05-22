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
import { selectCities, setCities } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function CountrySelect() {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);

  const handleChange = (event: SelectChangeEvent<typeof cities>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setCities(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      )
    );
  };
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
        <MenuItem key={option.value} value={option.label}>
          <Checkbox checked={cities.indexOf(option.label) > -1} />
          {option.label}
        </MenuItem>
      );
    });
    return [<ListSubheader> {group.groupName}</ListSubheader>, items];
  };

  return (
    <FormControl sx={{ width: 110 }}>
      <InputLabel id='demo-simple-select-label'>Περιοχή</InputLabel>
      <Select
        multiple
        labelId='demo-simple-select-label'
        value={cities}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        input={<OutlinedInput label='Περιοχή' />}
        MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
      >
        {getGroupedOptions().map((group, i) => renderSelectGroup(group))}
      </Select>
    </FormControl>
  );
}
