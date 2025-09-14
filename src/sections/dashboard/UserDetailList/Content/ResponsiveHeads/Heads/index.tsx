import { useTranslation } from "react-i18next";
import ResponsiveGrid from "../../ResponsiveGrid";
import CustomTypography from "../CustomTypography";
import getDATA, { DataProps, Datum } from "../../getDATA";
import { useGetDashboardQuery } from "@/services/dashboard";
import useReduced from "./useReduced";
import { useMemo } from "react";

const Head = ({ label, count, xs, textAlign }: Datum) => (
    <ResponsiveGrid item xs={xs}>
        <CustomTypography label={label} count={count} textAlign={textAlign} />
    </ResponsiveGrid>
);

const getHead = (d: Datum) => <Head key={d.label} {...d} />;

const Heads = () => {
    const { data } = useGetDashboardQuery();

    const users = data?.propertiesPerUserList ?? [];

    const totalActiveProperties = data?.totalActiveProperties ?? 0;
    const totalProperties = data?.totalProperties ?? 0;
    const totalInactiveProperties = data?.totalInactiveProperties ?? 0;

    const { totalTasks, totalCustomers, totalNotifications } =
        useReduced(users);

    const p: DataProps = {
        totalTasks,
        totalActiveProperties,
        totalProperties,
        totalInactiveProperties,
        totalCustomers,
        totalNotifications,
    };

    const { t } = useTranslation();
    const DATA = useMemo(() => getDATA(t, p), [t, p]);

    return DATA.map(getHead);
};

export default Heads;
