import { Button, Stack } from "@mui/material";
import { FC, useState } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import { LoadingButton } from "@mui/lab";
import {
    getAllDayStartEnd,
    isAllDay as getIsAllDay,
} from "@/components/Calendar/util";
import EventDates from "./EventDates";
import dayjs from "dayjs";

interface Props {
    event?: TCalendarEvent;
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;
}

const CreateUpdateForm: FC<Props> = ({ event, onSubmit, onClose }) => {
    const { t } = useTranslation();

    // INFO: initial value
    const _isAllDay = event
        ? getIsAllDay(event.startDate, event.endDate)
        : false;
    // INFO: all day checkbox
    const [isAllDay, setAllDay] = useState(_isAllDay);
    // INFO: date for when checked
    const [allDayDate, setAllDayDate] = useState(
        event?.startDate || dayjs().toISOString()
    );

    const methods = useForm<CalendarEventReq>({
        values: event,
    });

    const isDirty = _isAllDay !== isAllDay || methods.formState.isDirty;
    const isSubmitting = methods.formState.isSubmitting;

    const handleAllDay = (_: any, b: boolean) => setAllDay(b);

    // INFO: normalise dates if isAllDay
    const handleSubmit = async (e: CalendarEventReq) => {
        await onSubmit({
            ...e,
            ...(isAllDay ? getAllDayStartEnd(allDayDate) : {}),
        });

        onClose();
    };

    const handleReset = () => {
        setAllDay(_isAllDay);
        methods.reset();
    };

    return (
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormProvider {...methods}>
                <Stack spacing={2} mt={1}>
                    <RHFTextField
                        variant="standard"
                        name="title"
                        placeholder={t<string>("Title")}
                    />

                    <EventDates
                        allDay={isAllDay}
                        onAllDayChange={handleAllDay}
                        allDayDate={allDayDate}
                        onAllDayDateChange={setAllDayDate}
                    />

                    <RHFMultilineTextField
                        label={t("Description")}
                        name="description"
                        multiline
                        rows={5}
                    />

                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        {isDirty ? (
                            <Button onClick={handleReset}>{t("Reset")}</Button>
                        ) : null}

                        <Button onClick={onClose}>{t("Cancel")}</Button>

                        {isDirty ? (
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                {t(event ? "Update" : "Create")}
                            </LoadingButton>
                        ) : null}
                    </Stack>
                </Stack>
            </FormProvider>
        </form>
    );
};

export default CreateUpdateForm;
