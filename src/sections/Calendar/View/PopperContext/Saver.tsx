import {
    TOnEventDragEndAsync,
    TOnEventResizeEndAsync,
} from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import getEndDateForDuration from "./getEndDateForDuration";

interface SaverRef {
    drag: TOnEventDragEndAsync;
    resize: TOnEventResizeEndAsync;
}

interface SaverProps {}

const Saver = forwardRef<SaverRef, SaverProps>((props, ref) => {
    const { user } = useAuth();
    const [updateEvent] = useUpdateEventMutation();

    const drag: TOnEventDragEndAsync = useCallback(
        async (ce, startDate, endDate) => {
            const res = await updateEvent({
                body: { ...ce, startDate, endDate },
                userId: user?.id!,
            });

            return !("error" in res);
        },
        []
    );

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
            drag,
            resize,
        }),
        []
    );

    return null;
});

export type { SaverRef };
export default Saver;
