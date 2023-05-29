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
import { useCallback, useEffect } from "react";
import { useGetSubAreasMutation } from "src/services/location";
// import { useGetSubAreasMutation } from "src/services/location";
import {
  selectParentLocation,
  selectSubLocation,
  setSubLocation,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function SubAreas() {
  const dispatch = useDispatch();
  const parentLocations = useSelector(selectParentLocation);

  const subLocations = useSelector(selectSubLocation);
  const [getSubAreas, { data: subLocationOptions }] = useGetSubAreasMutation();

  const getSubLocations = useCallback(() => {
    getSubAreas(parentLocations.map((location) => +location));
  }, [parentLocations]);

  useEffect(() => {
    getSubLocations();
  }, [parentLocations]);

  const handleChange = (event: SelectChangeEvent<typeof subLocations>) => {
    const {
      target: { value },
    } = event;
    dispatch(
      setSubLocation(
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
    const groupedOptions = subLocationOptions!.reduce((acc: any, option) => {
      const groupName = option["parentNameGR"];
      const optionData = { value: option["areaID"], label: option["nameGR"] };
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
          <Checkbox checked={subLocations.indexOf(option.value) > -1} />
          {option.label}
        </MenuItem>
      );
    });
    return [<ListSubheader> {group.groupName}</ListSubheader>, items];
  };
  if (parentLocations.length === 0) {
    return null;
  }
  return (
    <FormControl sx={{ width: 140 }}>
      <InputLabel id='demo-simple-select-label'>Υποπεριοχή</InputLabel>
      <Select
        multiple
        labelId='demo-simple-select-label'
        value={subLocations}
        onChange={handleChange}
        renderValue={(selected) =>
          selected
            .map((value) => {
              const option = subLocationOptions!.find(
                (opt) => opt["areaID"] === +value
              );
              return option ? option["nameGR"] : "";
            })
            .join(", ")
        }
        input={<OutlinedInput label='Υποπεριοχή' />}
        MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
      >
        {subLocationOptions &&
          getGroupedOptions().map((group, i) => renderSelectGroup(group))}
      </Select>
    </FormControl>
  );
}
