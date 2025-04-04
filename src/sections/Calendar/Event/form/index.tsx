import { Button, Skeleton, Stack } from "@mui/material";
import { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import {
    CALENDAR_COLOR_FALLBACK,
    TCalendarEvent,
} from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import RHFTypeSelect from "./RHFTypeSelect";
import Pickers from "./Pickers";
import dynamic from "next/dynamic";
import RHFEditor from "@/components/hook-form/RHFEditor";
const Color = dynamic(() => import("./Color"), {
    loading: () => <Skeleton variant="circular" width="30px" height="30px" />,
});
const People = dynamic(() => import("./People"));
const RHFLocation = dynamic(() => import("./RHFLocation"));

// ------------------------------------------------------------------------

const getDefault = (startDate?: string): CalendarEventReq => ({
    title: "",
    description: "",
    startDate: startDate || "",
    endDate: startDate ? dayjs(startDate).add(1, "hour").toISOString() : "",
    location: "",
    people: [],
    type: "TASK",
    colorId: CALENDAR_COLOR_FALLBACK,
});

// ------------------------------------------------------------------------

const PeopleLoader = () => {
    const type = useWatch<CalendarEventReq>({ name: "type" });
    const isNotTask = type !== "TASK";

    if (isNotTask) return <People />;

    return null;
};

// ------------------------------------------------------------------

const TextFieldSx = {
    px: 0.5,
};

interface Props {
    startDate?: string; // INFO: on Create mode, this dialog always needs a startDate!
    event?: TCalendarEvent; // INFO: on Edit mode, we use this
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;
}

interface FormRef {
    updateDates: (startDate: string, endDate: string) => void;
}

const CreateUpdateForm = forwardRef<FormRef, Props>(
    ({ startDate, event, onSubmit, onClose }, ref) => {
        const { t } = useTranslation();

        const methods = useForm<CalendarEventReq>({
            values: event || getDefault(startDate),
        });

        const updateDates = useCallback(
            (startDate: string, endDate: string) => {
                methods.setValue("startDate", startDate, { shouldDirty: true });
                methods.setValue("endDate", endDate, { shouldDirty: true });
            },
            []
        );
        useImperativeHandle(
            ref,
            () => ({
                updateDates,
            }),
            []
        );

        const isDirty = methods.formState.isDirty;
        const isSubmitting = methods.formState.isSubmitting;

        const handleSubmit = useCallback(
            async (e: CalendarEventReq) => {
                await onSubmit(e);
                onClose();
            },
            [onClose]
        );

        return (
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <FormProvider {...methods}>
                    <Stack spacing={2} minHeight="400px">
                        <RHFTextField
                            variant="standard"
                            name="title"
                            placeholder={t<string>("Title")}
                            sx={TextFieldSx}
                        />

                        <Pickers
                            startDate={startDate || event?.startDate}
                            endDate={startDate || event?.endDate}
                        />

                        <RHFLocation />

                        <Stack direction="row" spacing={1}>
                            <Color />
                            <RHFTypeSelect />
                        </Stack>

                        <PeopleLoader />

                        <RHFEditor name="description" rows={5} />

                        <Stack
                            flexDirection={{ xs: "column-reverse", sm: "row" }}
                            gap={1}
                            justifyContent="flex-end"
                            alignItems="center"
                        >
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
    }
);

export type { FormRef };
export default CreateUpdateForm;
