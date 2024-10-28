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
import RHFTypeSelect from "./RHFTypeSelect";
import RHFLocation from "./RHFLocation";

const TextFieldSx = {
    px: 0.5,
};

interface Props {
    startDate?: string; // INFO: on Create mode, this dialog always needs a startDate!
    event?: TCalendarEvent; // INFO: on Edit mode, we use this
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;
}

const CreateUpdateForm: FC<Props> = ({
    startDate,
    event,
    onSubmit,
    onClose,
}) => {
    const { t } = useTranslation();

    // INFO: is all day checkbox
    const _isAllDay = event
        ? getIsAllDay(event.startDate, event.endDate)
        : false;
    const [isAllDay, setAllDay] = useState(_isAllDay);

    // INFO: date for when checked
    const [_allDayDate] = useState(
        event?.startDate || startDate || dayjs().toISOString()
    );
    const [allDayDate, setAllDayDate] = useState(_allDayDate);

    const methods = useForm<CalendarEventReq>({
        values: event || {
            title: "",
            description: "",
            startDate: startDate || "",
            endDate: startDate
                ? dayjs(startDate).add(1, "hour").toISOString()
                : "",
            location: "",
            type: "TASK",
            withIds: [],
        },
    });

    const isDirty =
        _isAllDay !== isAllDay ||
        _allDayDate !== allDayDate ||
        methods.formState.isDirty;

    const isSubmitting = methods.formState.isSubmitting;

    const handleAllDay = (_: any, b: boolean) => setAllDay(b);

    const handleSubmit = async (e: CalendarEventReq) => {
        // INFO: normalise dates if isAllDay
        const [startDate, endDate] = isAllDay
            ? getAllDayStartEnd(allDayDate)
            : [e.startDate, e.endDate];

        await onSubmit({
            ...e,
            startDate,
            endDate,
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
                        sx={TextFieldSx}
                    />

                    <EventDates
                        allDay={isAllDay}
                        onAllDayChange={handleAllDay}
                        allDayDate={allDayDate}
                        onAllDayDateChange={setAllDayDate}
                    />

                    <RHFLocation />

                    <RHFTypeSelect />

                    <RHFMultilineTextField
                        label={t("Description")}
                        name="description"
                        multiline
                        rows={5}
                    />

                    <Stack
                        flexDirection={{ xs: "column-reverse", sm: "row" }}
                        gap={1}
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
