import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { StyledDialogContent } from "./styles";

import { useSelector } from "react-redux";
import { useDispatch } from "src/store";

import Iconify from "src/components/iconify";

import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import { useAllGlobalsQuery } from "src/services/global";
import sumOfChangedProperties, {
  selectFrameType,
  selectFurnished,
  selectHeatingType,
  selectMaxBedrooms,
  selectMaxConstructionYear,
  selectMaxFloor,
  selectMinBedrooms,
  selectMinConstructionYear,
  selectMinFloor,
  setFrameType,
  setFurnished,
  setHeatingType,
  setMaxBedrooms,
  setMaxConstructionYear,
  setMaxFloor,
  setMinBedrooms,
  setMinConstructionYear,
  setMinFloor,
} from "src/slices/filters";

import { useState } from "react";

import ChosenFilters from "./ChosenFilters";
import SaleSelect from "./FilterSale";
import CategorySelect from "./FilterCategory";
import SubCategorySelect from './FilterSubCategory';
import PriceSelect from "./FilterPrice";
import FilterLabels from "./FilterLabels";
import CodeSelect from "./FilterCode";
import ManagerIdSelect from "./FilterManagerId";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onApply: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
};

export default function FilterMore({
  open,
  onApply,
  onClose,
  onResetFilter,
}: Props) {
  const dispatch = useDispatch();
  const changedPropsCount = useSelector(sumOfChangedProperties);
  const { data } = useAllGlobalsQuery();
  const frameType = useSelector(selectFrameType);
  const furnished = useSelector(selectFurnished);
  const heatingType = useSelector(selectHeatingType);
  const minYear = useSelector(selectMinConstructionYear) || 0;
  const maxYear = useSelector(selectMaxConstructionYear) || 0;
  const minBedrooms = useSelector(selectMinBedrooms) || 0;
  const maxBedrooms = useSelector(selectMaxBedrooms) || 0;
  const minFloors = useSelector(selectMinFloor) || 0;
  const maxFloors = useSelector(selectMaxFloor) || 0;

  const [showAll, setShowAll] = useState(false);

  const fields = [
    {
      id: "frameType",
      value: frameType,
      title: "Frame Type",
      options: data?.property.details.frameType,
      onClick: setFrameType,
    },
    {
      id: "Furnished",
      value: furnished,
      title: "Furnished",
      options: data?.property.details.furnished,
      onClick: setFurnished,
    },
    {
      id: "heatingType",
      title: "Heating Type",
      value: heatingType,
      options: data?.property.details.heatingType,
      onClick: setHeatingType,
    },
  ];

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose} scroll={"body"}>
      <DialogTitle>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Chip label={changedPropsCount} color={"error"} />
          <Typography variant='subtitle1'>Φίλτρα</Typography>

          <Stack direction={"row"}>
            <Button
              startIcon={showAll ? <FilterListOffIcon /> : <FilterListIcon />}
              sx={{ marginRight: 2 }}
              onClick={() => setShowAll(!showAll)} variant={showAll ? 'contained' : 'outlined'}
            >
              Όλα
            </Button>

            <IconButton onClick={onClose}>
              <Iconify icon='eva:close-fill' />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      {
        showAll && changedPropsCount > 0 &&
        <StyledDialogContent>
          <ChosenFilters />
        </StyledDialogContent>
      }
      {
        showAll &&
        <StyledDialogContent dividers>
          <Typography>Basic</Typography>

          <Stack direction={"row"} spacing={1}>
            <CodeSelect />
            <ManagerIdSelect />

            <SaleSelect />

            <CategorySelect />
            <SubCategorySelect />

            <PriceSelect type="price" />
            <PriceSelect type="area" />

            <FilterLabels />
          </Stack>
        </StyledDialogContent>
      }
      <StyledDialogContent sx={{ maxHeight: "none", overflow: "visible" }} dividers>
        <Typography>Bedrooms</Typography>
        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Από</Typography>
          <Select
            sx={{ width: 130 }}
            value={minBedrooms}
            onChange={(e) => dispatch(setMinBedrooms(e.target.value === 0 ? undefined : e.target.value))}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 210,
                  overflowY: "scroll",
                },
              },
            }}
          >
            <MenuItem value={0}>
              <ListItemText primary={"Αδιάφορο"} />
            </MenuItem>
            {generateNumbers().map((option) => (
              <MenuItem
                key={option}
                value={option}
                onClick={() =>
                  option > maxBedrooms &&
                  maxBedrooms !== 0 &&
                  dispatch(setMaxBedrooms(0))
                }
              >
                <ListItemText primary={option.toString()} />
              </MenuItem>
            ))}
          </Select>
          <Typography>- Εώς</Typography>
          <Select
            sx={{ width: 130 }}
            value={maxBedrooms}
            onChange={(e) => dispatch(setMaxBedrooms(e.target.value === 0 ? undefined : e.target.value))}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 210,
                  overflowY: "scroll",
                },
              },
            }}
          >
            <MenuItem value={0}>
              <ListItemText primary={"Αδιάφορο"} />
            </MenuItem>
            {generateNumbers().map((option) => (
              <MenuItem
                key={option}
                value={option}
                onClick={() =>
                  option < minBedrooms && dispatch(setMinBedrooms(0))
                }
              >
                <ListItemText primary={option.toString()} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </StyledDialogContent>
      <StyledDialogContent dividers>
        <Typography>Floors</Typography>
        <Stack direction='row' spacing={1} alignItems={"center"}>
          <Typography>Από</Typography>
          <Select
            sx={{ width: 130 }}
            value={minFloors}
            onChange={(e) => dispatch(setMinFloor(e.target.value === 0 ? undefined : e.target.value))}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 210,
                  overflowY: "scroll",
                },
              },
            }}
          >
            <MenuItem value={0}>
              <ListItemText primary={"Αδιάφορο"} />
            </MenuItem>
            {generateNumbers().map((option) => (
              <MenuItem
                key={option}
                value={option}
                onClick={() =>
                  option > +maxFloors &&
                  maxFloors !== 0 &&
                  dispatch(setMaxFloor(0))
                }
              >
                <ListItemText primary={option.toString()} />
              </MenuItem>
            ))}
          </Select>
          <Typography>- Εώς</Typography>
          <Select
            sx={{ width: 130 }}
            value={maxFloors}
            onChange={(e) => dispatch(setMaxFloor(e.target.value === 0 ? undefined : e.target.value))}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 210,
                  overflowY: "scroll",
                },
              },
            }}
          >
            <MenuItem value={0}>
              <ListItemText primary={"Αδιάφορο"} />
            </MenuItem>
            {generateNumbers().map((option) => (
              <MenuItem
                key={option}
                value={option}
                onClick={() => option < +minFloors && dispatch(setMinFloor(0))}
              >
                <ListItemText primary={option.toString()} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </StyledDialogContent>
      {
        fields.map((field) => (
          <StyledDialogContent key={field.id} dividers>
            <Typography>{field.title}</Typography>
            <Stack direction={"row"} spacing={1}>
              {field.options &&
                field.options.map((e) => (
                  <Button
                    variant={field.value === e ? "contained" : "outlined"}
                    color={"primary"}
                    key={e}
                    onClick={() => dispatch(field.onClick(e))}
                  >
                    {e}
                  </Button>
                ))}
            </Stack>
          </StyledDialogContent>
        ))
      }

      <StyledDialogContent dividers>
        <Typography>Construction Year</Typography>
        <Slider
          value={[minYear, maxYear]}
          onChange={(_event, newValue) => {
            if (Array.isArray(newValue)) {
              dispatch(setMinConstructionYear(newValue[0]));
              dispatch(setMaxConstructionYear(newValue[1]));
            }
            console.log(newValue);
          }}
          min={1960}
          max={new Date().getFullYear()}
          marks={[
            { value: 1960, label: "1960" },
            {
              value: new Date().getFullYear(),
              label: new Date().getFullYear().toString(),
            },
          ]}
          valueLabelDisplay='auto'
          aria-labelledby='year-slider'
        />
      </StyledDialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button color={"secondary"} onClick={onResetFilter}>
          Εκκαθάριση όλων
        </Button>

        <Button
          color={"secondary"}
          variant='outlined'
          onClick={() => {
            onApply();
            onClose();
          }}
        >
          Εφαρμογή
        </Button>
      </DialogActions>
    </Dialog >
  );
}

function generateNumbers() {
  const numbers = [];

  for (let i = 1; i <= 10; i += 1) {
    numbers.push(i);
  }

  return numbers;
}
