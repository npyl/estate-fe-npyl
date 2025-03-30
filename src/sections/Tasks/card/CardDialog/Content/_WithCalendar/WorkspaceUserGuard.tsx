import { useGetUserQuery } from "@/services/user";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import SvgIcon from "@mui/material/SvgIcon";
import { FC, PropsWithChildren } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";

// -----------------------------------------------------------------------------------------

/**
 * Checks whether the currently selected assignee has a google workspace email setup
 */
const useIsWorkspaceUser = () => {
    const userIds = useWatch<ICreateOrUpdateTaskReq>({ name: "userIds" });
    const userId = Array.isArray(userIds) ? (userIds[0] as number) : -1;
    const { data } = useGetUserQuery(userId, { skip: userId === -1 });
    return Boolean(data?.workspaceEmail);
};

// -----------------------------------------------------------------------------------------

const CrossedUserIcon = () => (
    <SvgIcon>
        <PersonIcon />
        <path
            d="M22 2L2 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </SvgIcon>
);

const IconButtonSx: SxProps<Theme> = {
    width: "fit-content",
};

const ErrorInfo = () => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <IconButton sx={IconButtonSx}>
                <CrossedUserIcon />
            </IconButton>

            <Typography variant="body2" color="text.secondary">
                {t("_NOT_GOOGLE_WORKSPACE_USER_")}
            </Typography>
        </Stack>
    );
};

// -----------------------------------------------------------------------------------------

const WorkspaceUserGuard: FC<PropsWithChildren> = ({ children }) => {
    const isWorkspaceUser = useIsWorkspaceUser();

    if (!isWorkspaceUser) return <ErrorInfo />;

    return <>{children}</>;
};

export default WorkspaceUserGuard;
