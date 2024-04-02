import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
    Box,
    Grid,
    List,
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
    selectStates,
    setMaxArea,
    setMaxPrice,
    setMinArea,
    setMinPrice,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { useTranslation } from "react-i18next";
import {
    ListItem,
    StyledBox,
    StyledPriceButton,
} from "@/components/Filters/styled";

interface Props {
    type: string;
}

const PriceSelect = ({ type }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        setMinValue,
        setMaxValue,
        selectMinValue,
        selectMaxValue,
        symbol,
        label,
    } = useMemo(
        () =>
            type === "price"
                ? {
                      setMinValue: setMinPrice,
                      setMaxValue: setMaxPrice,
                      selectMinValue: selectMinPrice,
                      selectMaxValue: selectMaxPrice,
                      symbol: "€",
                      label: "Price",
                  }
                : {
                      setMinValue: setMinArea,
                      setMaxValue: setMaxArea,
                      selectMinValue: selectMinArea,
                      selectMaxValue: selectMaxArea,
                      symbol: "m²",
                      label: "Area",
                  },
        [type]
    );

    const valueMin = useSelector(selectMinValue) || 0;
    const valueMax = useSelector(selectMaxValue) || 0;
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

    const values = useMemo(() => {
        return generateNumbers(states, type);
    }, [states, type]);

    const renderLabel = useMemo(() => {
        if (valueMin === 0 && valueMax === 0) {
            return t(label);
        }
        if (valueMin && valueMax === 0) {
            return "Από " + formatNumber(+valueMin) + symbol;
        }
        if (valueMin === 0 && valueMax) {
            return "Εώς " + formatNumber(+valueMax) + symbol;
        }
        return formatNumber(+valueMin) + "-" + formatNumber(+valueMax) + symbol;
    }, [valueMax, valueMin, t]);

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={() => setOpen(false)}
        >
            <Box>
                <StyledPriceButton
                    sx={{ minWidth: "135px" }}
                    open={open}
                    variant="outlined"
                    endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    onClick={handleClick}
                >
                    {renderLabel}
                </StyledPriceButton>
                {open && (
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        sx={{ zIndex: 2000 }}
                        placement="bottom-start"
                    >
                        <StyledBox>
                            <Grid container p={1} spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={`${symbol} ${t("from")}`}
                                        value={valueMin}
                                        onChange={handleInputChangeMin}
                                    />

                                    <List
                                        sx={{
                                            maxHeight: 300,
                                            overflowY: "scroll",
                                        }}
                                    >
                                        <ListItem
                                            onClick={() =>
                                                dispatch(setMinValue(undefined))
                                            }
                                        >
                                            <ListItemText
                                                primary={t("Indifferent")}
                                            />
                                        </ListItem>
                                        {values.map((option) => (
                                            <ListItem
                                                key={option}
                                                onClick={() =>
                                                    option > valueMax &&
                                                    valueMax !== 0
                                                        ? dispatch(
                                                              setMaxValue(
                                                                  option
                                                              )
                                                          )
                                                        : dispatch(
                                                              setMinValue(
                                                                  option
                                                              )
                                                          )
                                                }
                                            >
                                                <ListItemText
                                                    primary={formatNumber(
                                                        option
                                                    )}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label={`${symbol} ${t("to")}`}
                                        value={valueMax}
                                        onChange={handleInputChangeMax}
                                    />
                                    <List
                                        sx={{
                                            maxHeight: 300,
                                            overflowY: "scroll",
                                        }}
                                    >
                                        <ListItem
                                            onClick={() =>
                                                dispatch(setMaxValue(undefined))
                                            }
                                        >
                                            <ListItemText
                                                primary={t("Indifferent")}
                                            />
                                        </ListItem>
                                        {values.map((option) => (
                                            <ListItem
                                                key={option}
                                                onClick={() =>
                                                    option < valueMin
                                                        ? dispatch(
                                                              setMinValue(
                                                                  option
                                                              )
                                                          )
                                                        : dispatch(
                                                              setMaxValue(
                                                                  option
                                                              )
                                                          )
                                                }
                                            >
                                                <ListItemText
                                                    primary={formatNumber(
                                                        option
                                                    )}
                                                />
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
export default PriceSelect;
