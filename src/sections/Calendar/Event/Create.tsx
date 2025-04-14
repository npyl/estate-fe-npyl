import Form, { FormRef } from "./form";
import { forwardRef, useCallback, useRef } from "react";
import useEventMutations from "@/sections/Calendar/Event/View/useEventMutations";
import Popover, { EventPopperRef } from "@/sections/Calendar/Event/Popover";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

interface CreateEventPopperRef extends EventPopperRef {
    updateDates: (s: string, e: string) => void;
}

interface CreateEventPopperProps {
    startDate: string;
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const CreateEventPopper = forwardRef<
    CreateEventPopperRef,
    CreateEventPopperProps
>(({ startDate, anchorEl, onClose }, ref) => {
    const { createEvent } = useEventMutations();

    const formRef = useRef<FormRef>(null);
    const updateDates = useCallback((s: string, e: string) => {
        if (!s || !e) return;
        formRef.current?.updateDates(s, e);
    }, []);

    const [_, { onRef }] = useForwardedLocalRef<any>(ref, {
        updateDates,
    });

    return (
        <Popover ref={onRef} open anchorEl={anchorEl}>
            <Form
                ref={formRef}
                startDate={startDate}
                onSubmit={createEvent}
                onClose={onClose}
            />
        </Popover>
    );
});

export type { CreateEventPopperRef };
export default CreateEventPopper;
