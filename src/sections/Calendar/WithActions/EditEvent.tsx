import { TCalendarEvent } from "@/components/Calendar/types";
import Dialog from "@/components/Dialog";
import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    event: TCalendarEvent;
    onClose: VoidFunction;
}

const EditEventDialog: FC<Props> = ({ event, onClose }) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open
            title={<Typography variant="h6">{event.title}</Typography>}
            content={<></>}
            actions={
                <>
                    <Button>{t("Update")}</Button>
                </>
            }
        />
    );
};

export default EditEventDialog;
