import {
    RangeKeyDict,
    DateRangePicker as ReactDateRange,
    DateRangePickerProps as ReactDateRangeProps,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useDialog from "@/hooks/useDialog";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import parseISO from "date-fns/parseISO";
import { useCallback } from "react";

interface DateRangePickerProps
    extends Omit<ReactDateRangeProps, "ranges" | "onChange"> {
    startDate: string;
    endDate: string;
    onChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    startDate,
    endDate,
    onChange,
    ...props
}) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    const handleChange = useCallback((ranges: RangeKeyDict) => {
        const { selection } = ranges;

        if (selection.startDate && selection.endDate) {
            onChange(
                selection.startDate.toISOString(),
                selection.endDate.toISOString()
            );
        }
    }, []);

    return (
        <>
            <Button variant="outlined" onClick={openDialog}>
                {t("Select Date Range")}
            </Button>

            {isOpen ? (
                <Dialog open={isOpen} onClose={closeDialog}>
                    <DialogTitle>{t("Select Date Range")}</DialogTitle>
                    <DialogContent>
                        <ReactDateRange
                            ranges={[
                                {
                                    startDate: startDate
                                        ? parseISO(startDate)
                                        : new Date(),
                                    endDate: endDate
                                        ? parseISO(endDate)
                                        : new Date(),
                                    key: "selection",
                                },
                            ]}
                            onChange={handleChange}
                            {...props}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>{t("Close")}</Button>
                    </DialogActions>
                </Dialog>
            ) : null}
        </>
    );
};

export default DateRangePicker;
