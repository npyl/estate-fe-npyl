import { useAllUsersQuery } from "@/services/user";
import CreateButton from "./CreateButton";
import { useMemo } from "react";
import getRow from "./getRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { SxProps, Theme } from "@mui/material";

const ResponsiveSx: SxProps<Theme> = {
    display: {
        xs: "none",
        md: "table-cell",
    },
};

const UsersAndPermissions = () => {
    const { t } = useTranslation();

    const { data } = useAllUsersQuery();

    const activeStatuses = useMemo(
        () => data?.map(({ isActive }) => isActive) ?? [],
        [data]
    );

    return (
        <>
            <CreateButton />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width="fit-content">
                                {t("User")}
                            </TableCell>
                            <TableCell sx={ResponsiveSx} align="left">
                                {t("PERMISSIONS_Roles")}
                            </TableCell>
                            <TableCell>{t("State")}</TableCell>
                            <TableCell>{t("Active_Musculine")}</TableCell>
                            <TableCell align="right">
                                {t("Permissions")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data?.map(getRow(activeStatuses))}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UsersAndPermissions;
