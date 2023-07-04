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
import {
  selectParentLocation,
  setParentLocation,
  setSubLocation,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function CountrySelect() {
  const dispatch = useDispatch();
  const cities = useSelector(selectParentLocation) || [];

  const handleChange = (event: SelectChangeEvent<typeof cities>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setParentLocation(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      )
    );
    dispatch(setSubLocation([]));
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
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={cities.indexOf(option.value) > -1} />
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
        renderValue={(selected) =>
          selected
            .map((value: any) => {
              const option = nomoi.find((opt) => opt["Area ID"] === value);
              return option ? option["Name GR"] : "";
            })
            .join(", ")
        }
        input={<OutlinedInput label='Περιοχή' />}
        MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
      >
        {getGroupedOptions().map((group, i) => renderSelectGroup(group))}
      </Select>
    </FormControl>
  );
}
