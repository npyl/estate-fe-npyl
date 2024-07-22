import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow, { getDate } from "./basic";
import { CodeBadge } from "../components/CodeBadge";
import { useGetPropertyByCodeQuery } from "@/services/properties";
type TourType = "inPerson" | "inVideo";

const isLiveTour = (s?: TourType) => s === "inPerson" || s === "inVideo";

interface TourRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    filter: any;
    loading: boolean;
}

function TourRow({ row, onRemove, loading, onClick, filter }: TourRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);

    console.log("filter: ", filter);

    // const [getAllProperties ] =
    const { data: property } = useGetPropertyByCodeQuery(row.propertyCode);

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
                propertyDetails={property}
            />
        </Fragment>
    );
}

export default TourRow;
