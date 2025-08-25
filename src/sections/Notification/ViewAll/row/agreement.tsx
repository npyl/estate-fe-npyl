import { TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface AgreementRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
}

function AgreementRow({ row, onClick, filter }: AgreementRowProps) {
    return (
        <Fragment>
            <BasicRow row={row} filter={filter} onClick={onClick} />
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
