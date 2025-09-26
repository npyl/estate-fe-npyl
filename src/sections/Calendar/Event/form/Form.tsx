import {
    CALENDAR_COLOR_FALLBACK,
    TCalendarEvent,
} from "@/components/Calendar/types";
import { CalendarEventReq } from "@/types/calendar";
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

interface FormProps extends PropsWithChildren {
    startDate?: string; // INFO: on Create mode, this dialog always needs a startDate!
    event?: TCalendarEvent; // INFO: on Edit mode, we use this
    onSubmit: (e: CalendarEventReq) => Promise<any>;
    onClose: VoidFunction;
}

interface FormRef {
    updateDates: (startDate: string, endDate: string) => void;
}

const Form = forwardRef<FormRef, FormProps>(
    ({ startDate, event, onClose, onSubmit, children }, ref) => {
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
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <FormProvider {...methods}>{children}</FormProvider>
            </form>
        );
    }
);

export type { FormRef, FormProps };
export default Form;
