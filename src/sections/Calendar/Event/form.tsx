import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFDateTimePicker from "@/components/hook-form/RHFDateTimePicker";
import { LoadingButton } from "@mui/lab";
import { isAllDay as getIsAllDay } from "@/components/Calendar/util";
import dayjs from "dayjs";

const CheckboxSx = {
    width: "fit-content",
};

interface Props {
    event?: TCalendarEvent;
    onSubmit: (e: CalendarEventReq) => void;
    onClose: VoidFunction;
}

const CreateUpdateForm: FC<Props> = ({ event, onSubmit, onClose }) => {
    const { t } = useTranslation();

    // initial value
    const _isAllDay = event
        ? getIsAllDay(event.startDate, event.endDate)
        : false;

    const [isAllDay, setAllDay] = useState(_isAllDay);

    const methods = useForm<CalendarEventReq>({
        values: event,
    });

    const isDirty = _isAllDay !== isAllDay || methods.formState.isDirty;
    const isSubmitting = methods.formState.isSubmitting;

    const handleAllDay = (_: any, b: boolean) => setAllDay(b);

    const handleStartDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        methods.setValue("startDate", v.toISOString(), { shouldDirty: true });
    }, []);
    const handleEndDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        methods.setValue("endDate", v.toISOString(), { shouldDirty: true });
    }, []);

    const handleReset = () => {
        setAllDay(_isAllDay);
        methods.reset();
    };

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                                onChange={handleStartDate}
                            />
                            <RHFDateTimePicker
                                label={t("End")}
                                name="endDate"
                                onChange={handleEndDate}
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

export default CreateUpdateForm;
