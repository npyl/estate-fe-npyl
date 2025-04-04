import Form, { FormRef } from "./form";
import { FC, useCallback, useLayoutEffect, useRef } from "react";
import useEventMutations from "@/sections/Calendar/Event/View/useEventMutations";
import Popover from "@/sections/Calendar/Event/Popover";
import {
    DatesDetail,
    UPDATE_DATES_NAME,
} from "../View/PopperContext/updateDates";

interface Props {
    startDate: string;
    anchorEl: HTMLDivElement;
    onClose: VoidFunction;
}

const CreateEventPopover: FC<Props> = ({ startDate, anchorEl, onClose }) => {
    const { createEvent } = useEventMutations();

    const formRef = useRef<FormRef>(null);
    const updateDates = useCallback((e: CustomEventInit<DatesDetail>) => {
        const { startDate, endDate } = e.detail || {};
        if (!startDate || !endDate) return;
        formRef.current?.updateDates(startDate, endDate);
    }, []);
    useLayoutEffect(() => {
        document.addEventListener(UPDATE_DATES_NAME, updateDates);
        return () => {
            document.removeEventListener(UPDATE_DATES_NAME, updateDates);
        };
    }, []);

    return (
        <Popover open anchorEl={anchorEl}>
            <Form
                ref={formRef}
                startDate={startDate}
                onSubmit={createEvent}
                onClose={onClose}
            />
        </Popover>
    );
};

export default CreateEventPopover;
