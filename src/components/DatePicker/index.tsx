import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
    Box,
    ClickAwayListener,
    Popper,
    TextField,
    TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, useState } from "react";
import { Calendar, CalendarProps, DateObject } from "react-multi-date-picker";
import { CalendarBox } from "./styled";

const datePickerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.098,
        },
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.098,
        },
    },
};

export type DatePickerProps = Omit<TextFieldProps, "onSelect"> & {
    dateFrom?: string;
    dateTo?: string;
    date?: string;
    range?: boolean;
    label?: string;
    pickerProps?: Omit<CalendarProps, "value">;
    onSelect?: (dates: DateObject | DateObject[]) => void;
};

const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
        cursor: "pointer",
    },
});

const StyledCalendarIcon = styled(CalendarMonthIcon)({
    cursor: "pointer",
});

const id = "date-picker-popper";

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            dateFrom = "",
            dateTo = "",
            date = "",
            range = false,
            label = "",
            pickerProps,
            onSelect,
            ...props
        },
        ref
    ) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(anchorEl ? null : event.currentTarget);

        const handleClickAway = () => setAnchorEl(null);

        const open = Boolean(anchorEl);

        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <StyledTextField
                        ref={ref}
                        fullWidth
                        onClick={handleClick}
                        value={
                            range
                                ? `${new Date(
                                      dateFrom
                                  ).toDateString()} - ${new Date(
                                      dateTo
                                  ).toDateString()}`
                                : new Date(date).toDateString()
                        }
                        label={label || "Select dates"}
                        InputProps={{
                            readOnly: true,
                            endAdornment: <StyledCalendarIcon />,
                        }}
                        {...props}
                    />
                    <AnimatePresence>
                        {open && (
                            <Popper
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                sx={{
                                    zIndex: 1000,
                                    backgroundColor: "white",
                                }}
                            >
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={datePickerVariants}
                                >
                                    <CalendarBox isSingleDate>
                                        <Calendar
                                            value={
                                                range
                                                    ? [
                                                          dateFrom || "",
                                                          dateTo || "",
                                                      ]
                                                    : date || ""
                                            }
                                            onChange={onSelect}
                                            range={range}
                                            rangeHover
                                            highlightToday={true}
                                            numberOfMonths={1}
                                            monthYearSeparator=" "
                                            showOtherDays
                                            weekStartDayIndex={1}
                                            format="DD/MM/YYYY"
                                            {...pickerProps}
                                        />
                                    </CalendarBox>
                                </motion.div>
                            </Popper>
                        )}
                    </AnimatePresence>
                </Box>
            </ClickAwayListener>
        );
    }
);

export default DatePicker;
