import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC, useState } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFDateTimePicker from "@/components/hook-form/RHFDateTimePicker";

interface EditFormProps {
    event: TCalendarEvent;
    onClose: VoidFunction;
}

const EditForm: FC<EditFormProps> = ({ event, onClose }) => {
    const { t } = useTranslation();

    const [isAllDay, setAllDay] = useState(false);

    const methods = useForm<CalendarEventReq>({
        values: event,
    });

    const handleAllDay = (_: any, b: boolean) => setAllDay(b);

    return (
        <FormProvider {...methods}>
            <Stack spacing={1} mt={1}>
                <RHFTextField
                    variant="standard"
                    label={t("Title")}
                    name="title"
                />

                <FormControlLabel
                    label={t("All day")}
                    control={<Checkbox />}
                    checked={isAllDay}
                    onChange={handleAllDay}
                />

                {!isAllDay ? (
                    <Stack direction="row" spacing={1}>
                        <RHFDateTimePicker
                            label={t("Start")}
                            name="startDate"
                        />
                        <RHFDateTimePicker label={t("End")} name="endDate" />
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
                    <Button onClick={onClose}>{t("Cancel")}</Button>
                    <Button type="submit" variant="contained">
                        {t("Update")}
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default EditForm;
