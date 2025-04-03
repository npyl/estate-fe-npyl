import { CalendarCellProps } from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import { ComponentType, useCallback, useState } from "react";
import useTimeFromOffset from "../_hooks/useTimeFromOffset";
import useAuthenticatedClick from "../_hooks/useAuthenticatedClick";

const CreateEventDialog = dynamic(() => import("../../Event/Create"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithTimeOffsetClick = (Cell: AnyCalendarCell) => {
    // INFO: Make sure to return a named component instead of an anonymous function
    const WrappedComponent = (props: CalendarCellProps) => {
        const [startDate, setStartDate] = useState("");
        const closeDialog = useCallback(() => setStartDate(""), []);

        const { onClick } = useTimeFromOffset(props.date, setStartDate);
        const { onAuthenticatedClick } = useAuthenticatedClick(onClick);

        return (
            <>
                <Cell {...props} onClick={onAuthenticatedClick} />

                {startDate ? (
                    <CreateEventDialog
                        startDate={startDate}
                        onClose={closeDialog}
                    />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithTimeOffsetClick(Cell)`;

    return WrappedComponent;
};

export default WithTimeOffsetClick;
