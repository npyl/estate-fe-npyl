import Form from "./form";
import { FC } from "react";
import useEventMutations from "@/sections/Calendar/Event/View/useEventMutations";
import Popover from "@/sections/Calendar/Event/Popover";
import Event from "@/components/Calendar/Event";

// -----------------------------------------------------------------

interface Props {
    startDate: string;
    anchorEl: HTMLDivElement;
    onClose: VoidFunction;
}

const CreateEventPopover: FC<Props> = ({ startDate, anchorEl, onClose }) => {
    const { createEvent } = useEventMutations();

    return (
        <>
            <Popover open anchorEl={anchorEl} onClose={onClose}>
                <Form
                    startDate={startDate}
                    onSubmit={createEvent}
                    onClose={onClose}
                />
            </Popover>
        </>
    );
};

export default CreateEventPopover;
