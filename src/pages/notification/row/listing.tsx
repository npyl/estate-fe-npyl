import { Fragment } from "react";
import useToggle from "src/hooks/useToggle";
import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";
import { Skeleton } from "@mui/material";

interface ListingRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    filter: any;
    loading: boolean;
}

function ListingRow({
    row,
    onRemove,
    loading,
    onClick,
    filter,
}: ListingRowProps) {
    const [open, toggleOpen] = useToggle(false);
    const { data: listing, isLoading } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id && !open,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.listingDetails,
            isLoading,
        }),
    });

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                loading={loading}
                filter={filter}
                onClick={onClick}
                contactDetails={listing}
            />
        </Fragment>
    );
}

export default ListingRow;
