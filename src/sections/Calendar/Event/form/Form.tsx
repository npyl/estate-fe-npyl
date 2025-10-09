import {
    CALENDAR_COLOR_FALLBACK,
    TCalendarEvent,
} from "@/components/Calendar/types";
import { CalendarEventReq } from "@/types/calendar";
import { styled, SxProps, Theme } from "@mui/material";
import dayjs from "dayjs";
import {
    forwardRef,
    PropsWithChildren,
    useCallback,
    useImperativeHandle,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

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

const StyledForm = styled("form")({});

interface FormProps extends PropsWithChildren {
    startDate?: string; // INFO: on Create mode, this dialog always needs a startDate!
    event?: TCalendarEvent; // INFO: on Edit mode, we use this
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;

    sx?: SxProps<Theme>;
}

interface FormRef {
    updateDates: (startDate: string, endDate: string) => void;
}

const Form = forwardRef<FormRef, FormProps>(
    ({ startDate, event, onClose, onSubmit, sx, children }, ref) => {
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
        useImperativeHandle(ref, () => ({ updateDates }), []);

        const handleSubmit = useCallback(
            async (e: CalendarEventReq) => {
                await onSubmit(e);
                onClose();
            },
            [onClose]
        );

        return (
            <StyledForm onSubmit={methods.handleSubmit(handleSubmit)} sx={sx}>
                <FormProvider {...methods}>{children}</FormProvider>
            </StyledForm>
        );
    }
);

export type { FormRef, FormProps };
export default Form;
