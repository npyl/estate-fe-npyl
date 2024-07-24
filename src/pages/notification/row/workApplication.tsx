import {
    Button,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Fragment, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DocumentSvg from "src/assets/Document";
import useToggle from "src/hooks/useToggle";
import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface ListingRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
}

function WorkApplication({
    row,
    onRemove,
    loading,
    onClick,
    filter,
}: ListingRowProps) {
    const [open, toggleOpen] = useToggle(false);
    const { data: workForUs } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id && !open,
        selectFromResult: ({ data }) => ({
            data: data?.workForUsDetails,
        }),
    });

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="dontShowType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                filter={filter}
                loading={loading}
                onClick={onClick}
                workDetails={workForUs}
            />
        </Fragment>
    );
}

export default WorkApplication;
