import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "@/services/user";
import getRow from "./getRow";
import CreateButton from "./CreateButton";

const UserPage = () => {
    const { t } = useTranslation();

    const { data: users } = useAllUsersQuery();

    const activeStatuses = useMemo(
        () => users?.map(({ isActive }) => isActive) ?? [],
        [users]
    );

    return (
        <div>
            <CreateButton />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("User")}</TableCell>
                            <TableCell>{t("Mobile Phone")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                            <TableCell>{t("Permissions")}</TableCell>
                            <TableCell>{t("Edit")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{users?.map(getRow(activeStatuses))}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserPage;
