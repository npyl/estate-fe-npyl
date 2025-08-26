import { TableCell, TableRow } from "@mui/material";
import { FC, Fragment } from "react";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface AgreementRowProps {
    row: ContactNotification;
    filter: any;
}

const AgreementRow: FC<AgreementRowProps> = ({ row, filter }) => (
    <Fragment>
        <BasicRow row={row} filter={filter} />
        <TableRow>
            <TableCell
                style={{
                    padding: 0,
                }}
                colSpan={7}
            />
        </TableRow>
    </Fragment>
);

export default AgreementRow;
