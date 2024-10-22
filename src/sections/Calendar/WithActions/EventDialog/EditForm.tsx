import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFDateTimePicker from "@/components/hook-form/RHFDateTimePicker";
import { LoadingButton } from "@mui/lab";
import { isSameDay } from "@/components/Calendar/Views/util";
import { END_HOUR, START_HOUR } from "@/constants/calendar";

// TODO: Fix this and return to isAllDay logic + reset support (something wrong with UTC)
const getIsAllDay = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isSameDate = isSameDay(start, end);
    const isSTART_HOUR = start.getHours() === START_HOUR;
    const isEND_HOUR = end.getHours() === END_HOUR;

    return isSameDate && isSTART_HOUR && isEND_HOUR;
};

const CheckboxSx = {
    width: "fit-content",
};

interface EditFormProps {
    event: TCalendarEvent;
    onClose: VoidFunction;
}

const EditForm: FC<EditFormProps> = ({ event, onClose }) => {
    const { t } = useTranslation();

    // initial value
    const _isAllDay = getIsAllDay(event?.startDate, event?.startDate);

    const [isAllDay, setAllDay] = useState(_isAllDay);

    const methods = useForm<CalendarEventReq>({
        values: event,
    });

    const isDirty = isAllDay || methods.formState.isDirty;
    const isSubmitting = methods.formState.isSubmitting;

    const handleAllDay = (_: any, b: boolean) => setAllDay(b);

    const handleReset = () => {
        setAllDay(_isAllDay);
        methods.reset();
    };

    const handleSubmit = async () => {};

    return (
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormProvider {...methods}>
                <Stack spacing={1} mt={1}>
                    <RHFTextField variant="standard" name="title" />

                    <FormControlLabel
                        label={t("All day")}
                        control={<Checkbox />}
                        checked={isAllDay}
                        onChange={handleAllDay}
                        sx={CheckboxSx}
                    />

                    {!isAllDay ? (
                        <Stack direction="row" spacing={1}>
                            <RHFDateTimePicker
                                label={t("Start")}
                                name="startDate"
                            />
                            <RHFDateTimePicker
                                label={t("End")}
                                name="endDate"
                            />
                        </Stack>
                    ) : null}

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
                                {t("Update")}
                            </LoadingButton>
                        ) : null}
                    </Stack>
                </Stack>
            </FormProvider>
        </form>
    );
};

export default EditForm;
