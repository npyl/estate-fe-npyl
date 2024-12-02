import { Fragment } from "react";

import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";
type TourType = "inPerson" | "inVideo";

interface TourRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    filter: any;
    loading: boolean;
}

function TourRow({ row, onRemove, loading, onClick, filter }: TourRowProps) {
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                filter={filter}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                loading={loading}
                onClick={onClick}
            />
        </Fragment>
    );
}

export default TourRow;
