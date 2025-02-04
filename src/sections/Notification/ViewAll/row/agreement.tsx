import { TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

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
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
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
