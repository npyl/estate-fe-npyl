import { useGetUserQuery } from "@/services/user";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { FC, PropsWithChildren } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import CrossedGoogleIcon from "@/assets/logo/CrossedGoogleLogo";

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

const ERROR_INFO_TESTID = "error-info-testid";

const IconButtonSx: SxProps<Theme> = {
    width: "fit-content",
};

const ErrorInfo = () => {
    const { t } = useTranslation();
    return (
        <Stack
            data-testid={ERROR_INFO_TESTID}
            direction="row"
            spacing={1}
            alignItems="center"
        >
            <IconButton sx={IconButtonSx}>
                <CrossedGoogleIcon />
            </IconButton>

            <Typography variant="body2" color="text.secondary">
                {t("_NOT_GOOGLE_WORKSPACE_USER_")}
            </Typography>
        </Stack>
    );
};

// -----------------------------------------------------------------------------------------

const PROTECTED_CONTENT_TESTID = "protected-content-testid";

const WorkspaceUserGuard: FC<PropsWithChildren> = ({ children }) => {
    const isWorkspaceUser = useIsWorkspaceUser();
    if (!isWorkspaceUser) return <ErrorInfo />;
    return <div data-testid={PROTECTED_CONTENT_TESTID}>{children}</div>;
};

export { PROTECTED_CONTENT_TESTID, ERROR_INFO_TESTID };
export default WorkspaceUserGuard;
