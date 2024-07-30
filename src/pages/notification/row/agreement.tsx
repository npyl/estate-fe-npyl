import {
    Box,
    Collapse,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { CodeBadge } from "../components/CodeBadge";
import Link from "next/link";
import { useGetPropertyByCodeQuery } from "@/services/properties";

interface AgreementRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
}

function AgreementRow({
    row,
    onRemove,
    loading,
    onClick,
    filter,
}: AgreementRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);
    const { data: agreement, isLoading } = useGetNotificationByIdQuery(
        row.id!,
        {
            skip: !row.id && !open,
            selectFromResult: ({ data, isLoading }) => ({
                data: data?.agreementDetails,
                isLoading,
            }),
        }
    );

    // const { data: property } = useGetPropertyByCodeQuery(row.propertyCode);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                filter={filter}
                loading={loading}
                onClick={onClick}
            />
            <TableRow>
                <TableCell
                    style={{
                        padding: 0,
                    }}
                    colSpan={7}
                ></TableCell>
            </TableRow>
        </Fragment>
    );
}

export default AgreementRow;
