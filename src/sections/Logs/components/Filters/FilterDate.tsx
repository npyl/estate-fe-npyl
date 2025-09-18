import { Box, ClickAwayListener, Popover } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { DateRange } from "react-date-range";
import { FilterButton } from "@/components/Filters";
import { addDays } from "date-fns"; // make sure you've installed date-fns as it's a peer dependency
import "react-date-range/dist/styles.css"; // main CSS file
import "react-date-range/dist/theme/default.css"; // theme CSS file
import useResponsive from "src/hooks/useResponsive";
import {
    useFiltersContext,
    useSelectFromDate,
    useSelectToDate,
} from "./Context";

const DateSelect = () => {
    const { t } = useTranslation();

    const { setFromDate, setToDate } = useFiltersContext();
    const fromDate = useSelectFromDate();
    const toDate = useSelectToDate();

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
        setFromDate(Math.floor(range.startDate.getTime()));
        setToDate(Math.floor(range.endDate.getTime()));
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

    const isMobile = useResponsive("down", "md");

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box>
                <FilterButton
                    variant="outlined"
                    endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    onClick={handleClick}
                >
                    {renderLabel()}
                </FilterButton>

                {open ? (
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        onClose={() => setOpen(false)}
                    >
                        {isMobile ? (
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />
                        ) : (
                            <DateRange
                                onChange={handleSelect}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                ranges={state}
                                direction="vertical"
                            />
                        )}
                    </Popover>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
};

export default DateSelect;
