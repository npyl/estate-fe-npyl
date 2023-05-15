import ClickAwayListener from "@mui/base/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Popper,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  selectMaxArea,
  selectMaxPrice,
  selectMinArea,
  selectMinPrice,
  setMaxArea,
  setMaxPrice,
  setMinArea,
  setMinPrice,
  selectStates,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { StyledBox, StyledPriceButton } from "./styles";

const RangeSelect = ({ type }: { type: string }) => {
  const dispatch = useDispatch();

  const setMinValue = useMemo(() => {
    if (type === "price") {
      return setMinPrice;
    }
    return setMinArea;
  }, [type]);
  const setMaxValue = useMemo(() => {
    if (type === "price") {
      return setMaxPrice;
    }
    return setMaxArea;
  }, [type]);

  const selectMinValue = useMemo(() => {
    if (type === "price") {
      return selectMinPrice;
    }
    return selectMinArea;
  }, [type]);
  const selectMaxValue = useMemo(() => {
    if (type === "price") {
      return selectMaxPrice;
    }
    return selectMaxArea;
  }, [type]);

  const valueMin = useSelector(selectMinValue);
  const valueMax = useSelector(selectMaxValue);
  const states = useSelector(selectStates);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleInputChangeMin = (event: any) => {
    const newValue = event.target.value;
    dispatch(setMinValue(isNaN(newValue) ? "" : newValue));
  };
  const handleInputChangeMax = (event: any) => {
    const newValue = event.target.value;
    dispatch(setMaxValue(isNaN(newValue) ? "" : newValue));
  };
  const symbol = useMemo(() => {
    if (type === "price") {
      return "€";
    }
    return "τ.μ";
  }, [type]);

  const label = useMemo(() => {
    if (type === "price") {
      return "Τιμή";
    }
    return "Εμβαδόν";
  }, [type]);

  const values = useMemo(() => {
    return generateNumbers(states, type);
  }, [states, type]);

  const customWidth = useMemo(() => {
    return (valueMin.toString().length + valueMax.toString().length) * 10 + 130;
  }, [valueMin, valueMax, type]);

  const renderLabel = useMemo(() => {
    if (valueMin === 0 && valueMax === 0) {
      return label;
    }
    if (valueMin && valueMax === 0) {
      return "Από " + formatNumber(+valueMin) + symbol;
    }
    if (valueMin === 0 && valueMax) {
      return "Εώς " + formatNumber(+valueMax) + symbol;
    }
    return formatNumber(+valueMin) + "-" + formatNumber(+valueMax) + symbol;
  }, [valueMax, valueMin]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setOpen(false)}
    >
      <Box>
        <StyledPriceButton
          sx={{ width: customWidth }}
          open={open}
          variant="outlined"
          endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          onClick={handleClick}
        >
          {renderLabel}
        </StyledPriceButton>
        {open && (
          <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
            <StyledBox>
              <Grid container padding={1} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`${symbol} Από`}
                    value={valueMin}
                    onChange={handleInputChangeMin}
                  />

                  <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
                    <ListItem
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "neutral.200",
                        },
                      }}
                      onClick={() => dispatch(setMinValue(0))}
                    >
                      <ListItemText primary={"Αδιάφορο"} />
                    </ListItem>
                    {values.map((option) => (
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "neutral.200",
                          },
                        }}
                        key={option}
                        onClick={() =>
                          option > valueMax && valueMax !== 0
                            ? dispatch(setMaxValue(option))
                            : dispatch(setMinValue(option))
                        }
                      >
                        <ListItemText primary={formatNumber(option)} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label={`${symbol} Εώς`}
                    value={valueMax}
                    onChange={handleInputChangeMax}
                  />
                  <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
                    <ListItem
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "neutral.200",
                        },
                      }}
                      onClick={() => dispatch(setMaxValue(0))}
                    >
                      <ListItemText primary={"Αδιάφορο"} />
                    </ListItem>
                    {values.map((option) => (
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "neutral.200",
                          },
                        }}
                        key={option}
                        onClick={() =>
                          option < valueMin
                            ? dispatch(setMinValue(option))
                            : dispatch(setMaxValue(option))
                        }
                      >
                        <ListItemText primary={formatNumber(option)} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </StyledBox>
          </Popper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function generateNumbers(states: string[], type: string) {
  const numbers = [];

  const HUNDRED_K = 100 * 1000;
  const HUNDRED = 100;
  const TEN_M = 10 * 1000 * 1000;
  const TEN_K = 10 * 1000;

  if (type === "price") {
    if (states.includes("Sale")) {
      for (let i = TEN_K; i <= TEN_M; i += HUNDRED_K - TEN_K) {
        numbers.push(i);
      }
    } else {
      for (let i = HUNDRED; i <= TEN_K; i += HUNDRED) {
        numbers.push(i);
      }
    }
  } else {
    for (let i = 10; i <= 1000; i += 10) {
      numbers.push(i);
    }
  }

  return numbers;
}
export default RangeSelect;
