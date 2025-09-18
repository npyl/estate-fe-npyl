import useDialog from "@/hooks/useDialog";
import Dialog from "@/components/Dialog";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Content, { DateRangePickerProps } from "./Content";
import { FC } from "react";

const DateRangePicker: FC<DateRangePickerProps> = (props) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <Button variant="outlined" onClick={openDialog}>
                {t("Select Date Range")}
            </Button>

            {isOpen ? (
                <Dialog
                    onClose={closeDialog}
                    title={t("Select Date Range")}
                    content={<Content {...props} />}
                    actions={
                        <Button onClick={closeDialog}>{t("Close")}</Button>
                    }
                />
            ) : null}
        </>
    );
};

export default DateRangePicker;
