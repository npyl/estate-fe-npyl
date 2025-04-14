import { TOnEventResizeEndAsync } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { forwardRef, useCallback, useImperativeHandle } from "react";

interface SaverRef {
    resize: TOnEventResizeEndAsync;
}

interface SaverProps {}

const Saver = forwardRef<SaverRef, SaverProps>(({}, ref) => {
    const { user } = useAuth();
    const [updateEvent] = useUpdateEventMutation();

    const resize: TOnEventResizeEndAsync = useCallback(async (e, h) => {
        // Convert h (pixel height) to hours
        const hoursDelta = h / 60;

        // Parse the startDate ISO string to a Date object
        const start = new Date(e.startDate);

        // Create a new Date for endDate by adding the calculated hours
        const end = new Date(start.getTime() + hoursDelta * 60 * 60 * 1000);

        // Convert endDate back to ISO string format
        const endDate = end.toISOString();

        const res = await updateEvent({
            body: { ...e, endDate },
            userId: user?.id!,
        });

        return !("error" in res);
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            resize,
        }),
        []
    );

    return null;
});

export type { SaverRef };
export default Saver;
