import { Button, Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { TCalendarEvent } from "@/components/Calendar/types";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import RHFTypeSelect from "./RHFTypeSelect";
import Pickers from "./Pickers";
import dynamic from "next/dynamic";
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
});

// ------------------------------------------------------------------------

const TextFieldSx = {
    px: 0.5,
};

interface Props {
    startDate?: string; // INFO: on Create mode, this dialog always needs a startDate!
    event?: TCalendarEvent; // INFO: on Edit mode, we use this
    onLoad?: VoidFunction;
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;
}

const CreateUpdateForm: FC<Props> = ({
    startDate,
    event,
    onLoad,
    onSubmit,
    onClose,
}) => {
    const { t } = useTranslation();

    const methods = useForm<CalendarEventReq>({
        values: event || getDefault(startDate),
    });

    const isNotTask = methods.watch("type") !== "TASK";

    const isDirty = methods.formState.isDirty;
    const isSubmitting = methods.formState.isSubmitting;

    const handleSubmit = useCallback(
        async (e: CalendarEventReq) => {
            await onSubmit(e);
            onClose();
        },
        [onClose]
    );

    const handleReset = useCallback(() => methods.reset(), []);

    const onRef = useCallback(
        (node: HTMLFormElement | null) => {
            if (!node) return;
            onLoad?.();
        },
        [onLoad]
    );

    return (
        <form ref={onRef} onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormProvider {...methods}>
                <Stack spacing={2}>
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

                    <RHFTypeSelect />

                    {isNotTask ? <People /> : null}

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
