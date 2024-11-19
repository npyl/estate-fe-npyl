import { useCalendarAuth } from "@/services/calendar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import AvatarButton from "@/components/CalendarGoogle/ButtonGroup/AvatarButton";
import { useTranslation } from "react-i18next";
import { FC, PropsWithChildren } from "react";
import { IconButton, SxProps, Theme, Typography } from "@mui/material";
import { useIsGoogleWorkspaceIntegratedQuery } from "@/services/company";

// ------------------------------------------------------------------------

interface IsAuthenticatedIndicatorProps extends PropsWithChildren {
    sx?: SxProps<Theme>;
}

const IsAuthenticatedIndicator: FC<IsAuthenticatedIndicatorProps> = ({
    sx,
    children,
}) => {
    const { t } = useTranslation();

    const { isAuthenticated, userInfo, isLoading, authenticate } =
        useCalendarAuth();

    if (isLoading)
        return (
            <Skeleton variant="circular" width="46px" height="46px" sx={sx} />
        );

    if (!isAuthenticated)
        return (
            <Button
                onClick={authenticate}
                startIcon={<OriginalGoogleLogo />}
                sx={sx}
            >
                {t("Login")}
            </Button>
        );

    return (
        <>
            <AvatarButton userInfo={userInfo} sx={sx} />
            {children}
        </>
    );
};

// ------------------------------------------------------------------------

import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { SvgIcon } from "@mui/material";
import OriginalGoogleLogo from "@/assets/logo/OriginalGoogleLogo";

const CrossedGoogleIcon = () => (
    <SvgIcon>
        <GoogleIcon />
        <path
            d="M22 2L2 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </SvgIcon>
);

const DisabledIndicator = () => {
    const { t } = useTranslation();
    return (
        <Tooltip
            title={
                <Typography>
                    {t("Not integrated. Please go to Settings -> Integrations")}
                </Typography>
            }
        >
            <IconButton>
                <CrossedGoogleIcon />
            </IconButton>
        </Tooltip>
    );
};

/**
 * Indicator for Google Worskpace
 * Checks:
 *  1) whether the office has a google workspace integrated
 *  2) a user is authenticated using oauth
 */

interface WorkspaceIndicatorProps extends IsAuthenticatedIndicatorProps {}

const WorkspaceIndicator: FC<WorkspaceIndicatorProps> = (props) => {
    const { data: isIntegrated } = useIsGoogleWorkspaceIntegratedQuery();

    if (!isIntegrated) return <DisabledIndicator />;

    return <IsAuthenticatedIndicator {...props} />;
};

export default WorkspaceIndicator;
