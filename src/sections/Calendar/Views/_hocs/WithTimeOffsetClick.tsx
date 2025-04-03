import { CalendarCellProps } from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import {
    ComponentType,
    useCallback,
    useRef,
    useState,
    MouseEvent,
} from "react";
import useTimeFromOffset from "../_hooks/useTimeFromOffset";
import useAuthenticatedClick from "../_hooks/useAuthenticatedClick";

const CreateEventPopover = dynamic(() => import("../../Event/Create"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithTimeOffsetClick = (Cell: AnyCalendarCell) => {
    // INFO: Make sure to return a named component instead of an anonymous function
    const WrappedComponent = (props: CalendarCellProps) => {
        const anchorRef = useRef<HTMLDivElement>();

        const [startDate, setStartDate] = useState("");
        const closePopover = useCallback(() => setStartDate(""), []);
        const onClickWithOffset = useCallback(
            (e: MouseEvent<HTMLDivElement>, date: string) => {
                anchorRef.current = e.currentTarget;
                setStartDate(date);
            },
            []
        );

        const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
        const { onAuthenticatedClick } = useAuthenticatedClick(onClick);

        return (
            <>
                <Cell {...props} onClick={onAuthenticatedClick} />

                {startDate && anchorRef.current ? (
                    <CreateEventPopover
                        anchorEl={anchorRef.current}
                        startDate={startDate}
                        onClose={closePopover}
                    />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithTimeOffsetClick(Cell)`;

    return WrappedComponent;
};

export default WithTimeOffsetClick;
