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
import { StyledPriceButton } from "./styles";

const RangeSelect = ({ type }: { type: string }) => {
  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? "" : firstValue,
    };
  });
  const [valueMin, setValueMin] = useState("");
  const [valueMax, setValueMax] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleInputChangeMin = (event: any) => {
    const newValue = event.target.value;
    setValueMin(isNaN(newValue) ? "" : newValue);
  };
  const handleInputChangeMax = (event: any) => {
    const newValue = event.target.value;
    setValueMax(isNaN(newValue) ? "" : newValue);
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
    return generateNumbers(type);
  }, [type]);
  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      touchEvent='onTouchStart'
      onClickAway={() => setOpen(false)}
    >
      <Box>
        <StyledPriceButton
          variant='outlined'
          endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          onClick={handleClick}
        >
          {label}
        </StyledPriceButton>
        {open && (
          <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
            <Box
              sx={{
                top: 28,
                right: 0,
                left: 0,
                zIndex: 1,
                border: "1px solid",
                p: 1,
                bgcolor: "background.paper",
              }}
            >
              <Grid container padding={1}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  paddingRight={1}
                  borderRight={"0.5px solid grey"}
                >
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
                      onClick={() => setValueMin("")}
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
                        onClick={() => setValueMin(option.toString())}
                      >
                        <ListItemText primary={formatNumber(option)} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid paddingLeft={1} item xs={12} sm={6}>
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
                      onClick={() => setValueMax("")}
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
                        onClick={() => setValueMax(option.toString())}
                      >
                        <ListItemText primary={formatNumber(option)} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Popper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function generateNumbers(type: string) {
  const numbers = [];
  if (type === "price") {
    for (let i = 100; i <= 10000; i += 100) {
      numbers.push(i);
    }
  } else {
    for (let i = 10; i <= 1000; i += 10) {
      numbers.push(i);
    }
  }

  return numbers;
}
export default RangeSelect;
