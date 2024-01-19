import React, { useState } from "react";
import {
    Popper,
    TextField,
    ClickAwayListener,
    Box,
    TextFieldProps,
    styled,
} from "@mui/material";
import { Calendar, CalendarProps, DateObject } from "react-multi-date-picker";
import { CalendarBox } from "./styled";
import { motion, AnimatePresence } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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

const DatePicker: React.FC<DatePickerProps> = ({
    dateFrom = "",
    dateTo = "",
    date = "",
    range = false,
    label = "",
    pickerProps,
    onSelect,
    ...props
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(anchorEl ? null : event.currentTarget);

    const handleClickAway = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box>
                <StyledTextField
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
                                                ? [dateFrom || "", dateTo || ""]
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
};

export default DatePicker;
