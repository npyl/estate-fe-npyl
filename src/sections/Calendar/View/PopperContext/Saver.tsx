import { TOnEventResizeEndAsync } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import getEndDateForDuration from "./getEndDateForDuration";

interface SaverRef {
    resize: TOnEventResizeEndAsync;
}

interface SaverProps {}

const Saver = forwardRef<SaverRef, SaverProps>(({}, ref) => {
    const { user } = useAuth();
    const [updateEvent] = useUpdateEventMutation();

    const resize: TOnEventResizeEndAsync = useCallback(async (e, h) => {
        const endDate = getEndDateForDuration(e.startDate, h);

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
