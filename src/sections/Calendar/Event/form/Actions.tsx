import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { LoadingButton } from "@mui/lab";
import { EVENT_POPOVER_SUBMIT_TESTID } from "./constants";

interface ActionsProps {
    event?: TCalendarEvent;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ event, onClose }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext<CalendarEventReq>();

    const isDirty = formState.isDirty;
    const isSubmitting = formState.isSubmitting;

    return (
        <Stack
            flexDirection={{ xs: "column-reverse", sm: "row" }}
            gap={1}
            justifyContent="flex-end"
            alignItems="center"
        >
            <Button onClick={onClose}>{t("Cancel")}</Button>

            {isDirty ? (
                <LoadingButton
                    data-testid={EVENT_POPOVER_SUBMIT_TESTID}
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    {t(event ? "Update" : "Create")}
                </LoadingButton>
            ) : null}
        </Stack>
    );
};

export default Actions;
