import { Box, ClickAwayListener, Grid, Popper } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "src/store";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { DateRangePicker } from "react-date-range";
import { StyledPriceButton } from "src/pages/components/Filters/styles";
import {
    selectFromDate,
    selectToDate,
    setFromDate,
    setToDate,
} from "src/slices/log";

import { addDays } from "date-fns"; // make sure you've installed date-fns as it's a peer dependency
import "react-date-range/dist/styles.css"; // main CSS file
import "react-date-range/dist/theme/default.css"; // theme CSS file

const DateSelect = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const fromDate = useSelector(selectFromDate);
    const toDate = useSelector(selectToDate);

    const initialStartDate = fromDate ? new Date(fromDate) : new Date();
    const initialEndDate = toDate ? new Date(toDate) : addDays(new Date(), 7); // or however far in the future you prefer

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Define the state structure for react-date-range, not just an array of Dates
    const [state, setState] = useState([
        {
            startDate: initialStartDate,
            endDate: initialEndDate,
            key: "selection",
        },
    ]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);
    };

    const handleSelect = (ranges: any) => {
        const range = ranges.selection; // 'selection' is the same key used in the state
        dispatch(setFromDate(Math.floor(range.startDate.getTime())));
        dispatch(setToDate(Math.floor(range.endDate.getTime())));
        setState([range]);
    };

    const renderLabel = () => {
        if (!fromDate || !toDate) {
            return t("Select Date");
        } else {
            // Check if fromDate and toDate are defined, if not, create a new Date object for today's date as a fallback
            const fromDateObj = fromDate ? new Date(fromDate) : new Date();
            const toDateObj = toDate ? new Date(toDate) : new Date();

            // Convert date objects to strings
            const fromDateStr = fromDateObj.toLocaleDateString();
            const toDateStr = toDateObj.toLocaleDateString();

            return `${fromDateStr} - ${toDateStr}`;
        }
    };

    return (
        <>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                    <StyledPriceButton
                        open={open}
                        variant="outlined"
                        endIcon={
                            open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                        }
                        onClick={handleClick}
                    >
                        {renderLabel()}
                    </StyledPriceButton>
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        placement="bottom-start"
                        style={{ zIndex: 9999 }} // Ensure it's on top of other components
                    >
                        <Grid
                            item
                            xs={12}
                            style={{ background: "white", padding: "16px" }}
                        >
                            <DateRangePicker
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                            />
                        </Grid>
                    </Popper>
                </Box>
            </ClickAwayListener>
        </>
    );
};

export default DateSelect;
