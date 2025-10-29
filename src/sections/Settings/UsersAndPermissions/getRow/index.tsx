import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { IUser } from "@/types/user";
import AvatarLarge, {
    PPAvatarLargeContentRightCN,
} from "@/components/Avatar/Large";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { ChevronDown } from "@/assets/icons/chevron-down";
import RoundIconButton from "@/components/RoundIconButton";
import {
    Collapse,
    StackProps,
    SxProps,
    Table,
    TableBody,
    TableHead,
    Theme,
} from "@mui/material";
import ToggleActiveButton from "./ToggleActiveButton";
import SeparatePermissions from "./SeparatePermissions";
import useToggle from "@/hooks/useToggle";
import Roles from "./Roles";

// -------------------------------------------------------------------------------------------------------

const getRowSx = (isOpen: boolean): SxProps => ({
    ".MuiTableCell-root": {
        border: isOpen ? 0 : undefined,
    },
});

// -------------------------------------------------------------------------------------------------------

const AvatarContainerProps: StackProps = {
    sx: {
        [`& .${PPAvatarLargeContentRightCN}`]: {
            display: {
                xs: "none",
                md: "flex",
            },
        },
    },
};

const ResponsiveSx: SxProps<Theme> = {
    display: {
        xs: "none",
        md: "table-cell",
    },
};

const UserCellSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
};

interface UserRowProps {
    activeStatuses: boolean[];
    user: IUser;
}

const UserRow: FC<UserRowProps> = ({ user, activeStatuses }) => {
    const { t } = useTranslation();

    const { avatar, firstName, lastName, email } = user;

    const [isOpen, toggleOpen] = useToggle();

    return (
        <>
            <TableRow sx={getRowSx(isOpen)}>
                <TableCell sx={UserCellSx}>
                    <AvatarLarge
                        src={avatar}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        containerProps={AvatarContainerProps}
                    />

                    {user.isAdmin ? (
                        <Label
                            opaque
                            color="info"
                            name={t("Admin")}
                            width="fit-content"
                        />
                    ) : null}
                </TableCell>

                <TableCell sx={ResponsiveSx}>
                    <Roles />
                </TableCell>

                <TableCell align="right">
                    {user.isAdmin ? null : (
                        <ToggleActiveButton
                            activeStatuses={activeStatuses}
                            userId={user.id}
                        />
                    )}
                </TableCell>

                <TableCell align="right">
                    <RoundIconButton size="small" onClick={toggleOpen}>
                        <ChevronDown
                            style={{
                                transform: isOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s",
                            }}
                        />
                    </RoundIconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell sx={{ py: 0, border: 0 }} colSpan={4}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("Notifications")}</TableCell>
                                    <TableCell>{t("Tasks")}</TableCell>
                                    <TableCell>{t("Agreements")}</TableCell>
                                    <TableCell>{t("Messages")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <SeparatePermissions user={user} />
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const getRow = (activeStatuses: boolean[]) => (u: IUser) => (
    <UserRow key={u.id} user={u} activeStatuses={activeStatuses} />
);

export default getRow;
