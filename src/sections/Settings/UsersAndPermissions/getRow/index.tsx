import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { IUser } from "@/types/user";
import AvatarLarge, {
    PPAvatarLargeContentRightCN,
} from "@/components/Avatar/Large";
import { ChevronDown } from "@/assets/icons/chevron-down";
import RoundIconButton from "@/components/RoundIconButton";
import { Box, Collapse, Stack, StackProps } from "@mui/material";
import ToggleActiveButton from "./ToggleActiveButton";
import SeparatePermissions from "./SeparatePermissions";
import useToggle from "@/hooks/useToggle";
import Roles from "./Roles";
import Actions from "./Actions";
import { SpaceBetween } from "@/components/styled";

// -------------------------------------------------------------------------------------------------------

const AvatarContainerProps: StackProps = {
    sx: {
        [`& .${PPAvatarLargeContentRightCN}`]: {
            display: {
                xs: "none",
                sm: "flex",
            },
        },
    },
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
            <SpaceBetween
                p={1}
                spacing={5}
                alignItems="center"
                //
                borderBottom={isOpen ? undefined : "1px solid"}
                borderColor="divider"
                boxShadow={isOpen ? 15 : undefined}
            >
                <Stack
                    width="fit-content"
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "left", sm: "center" }}
                    spacing={1}
                >
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
                </Stack>

                <Stack
                    width={1}
                    direction="row"
                    justifyContent="left"
                    display={{ xs: "none", md: "flex" }}
                >
                    <Roles roles={user.assignedRoles} />
                </Stack>

                <Stack direction="row" spacing={5} alignItems="center">
                    <Actions user={user} activeStatuses={activeStatuses} />

                    {user.isAdmin ? (
                        <Box width={43} />
                    ) : (
                        <ToggleActiveButton
                            activeStatuses={activeStatuses}
                            userId={user.id}
                        />
                    )}

                    {user.isAdmin ? (
                        <Box width={34} />
                    ) : (
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
                    )}
                </Stack>
            </SpaceBetween>

            <Stack bgcolor="neutral.100">
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Stack
                        px={1}
                        py={2}
                        spacing={3}
                        borderBottom={isOpen ? "1px solid" : undefined}
                        borderColor="divider"
                    >
                        <Box display={{ xs: "block", md: "none" }}>
                            <Roles roles={user.assignedRoles} />
                        </Box>

                        <SeparatePermissions user={user} />
                    </Stack>
                </Collapse>
            </Stack>
        </>
    );
};

const getRow = (activeStatuses: boolean[]) => (u: IUser) => (
    <UserRow key={u.id} user={u} activeStatuses={activeStatuses} />
);

export default getRow;
