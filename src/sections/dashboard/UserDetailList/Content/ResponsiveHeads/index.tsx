import { useTranslation } from "react-i18next";
import ResponsiveGrid from "../ResponsiveGrid";
import CustomTypography from "./CustomTypography";
import { FC } from "react";

// ------------------------------------------------------------------------

const CountsPopoverHead = () => {
    const { t } = useTranslation();
    return (
        <CustomTypography
            width={1 / 3}
            label={t("Statistics")}
            display={{ xs: "block", md: "none" }}
        />
    );
};

// ------------------------------------------------------------------------

interface HeadProps {
    totalTasks: number;
    totalProperties: number;
    totalActiveProperties: number;
    totalInactiveProperties: number;
    totalCustomers: number;
    totalNotifications: number;
}

const ResponsiveHeads: FC<HeadProps> = ({
    totalTasks,
    totalProperties,
    totalActiveProperties,
    totalInactiveProperties,
    totalCustomers,
    totalNotifications,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Tasks")}
                    count={totalTasks}
                    textAlign="left"
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Properties")}
                    count={totalProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Active")}
                    count={totalActiveProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Inactive")}
                    count={totalInactiveProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Customers")}
                    count={totalCustomers}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1.2}>
                <CustomTypography
                    label={t("Notifications")}
                    count={totalNotifications}
                />
            </ResponsiveGrid>

            <CountsPopoverHead />
        </>
    );
};

export type { HeadProps };
export default ResponsiveHeads;
