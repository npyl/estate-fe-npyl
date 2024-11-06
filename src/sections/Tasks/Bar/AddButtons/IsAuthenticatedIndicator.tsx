import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import { FC } from "react";
import { useCalendarAuth } from "@/services/calendar";
import React from "react";

interface IsAuthenticatedIndicatorProps {
    children: React.ReactElement;
}

const IsAuthenticatedIndicator: FC<IsAuthenticatedIndicatorProps> = ({
    children,
}) => {
    const { t } = useTranslation();

    const { isAuthenticated, isLoading, authenticate } = useCalendarAuth();

    if (isLoading) {
        return <Skeleton variant="circular" width="46px" height="46px" />;
    }

    return (
        <>
            {!isAuthenticated ? (
                <Button onClick={authenticate}>{t("Login")}</Button>
            ) : null}

            {React.cloneElement(children, { disabled: !isAuthenticated })}
        </>
    );
};

export default IsAuthenticatedIndicator;
