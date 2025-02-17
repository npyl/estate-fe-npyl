import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DashboardSidebarSection } from "../dashboard-sidebar-section";
import { useGetProfileQuery } from "src/services/user";
import getSections from "./getSections";

interface SectionsProps {
    currentPath: string;
}

const Sections: FC<SectionsProps> = ({ currentPath }) => {
    const { t } = useTranslation();

    const { data } = useGetProfileQuery();

    const isAdmin = data?.isAdmin ?? false;

    const notifications = Boolean(data?.notificationsEnabled);
    const agreements = Boolean(data?.agreementsEnabled);
    const messages = Boolean(data?.messagingEnabled);
    const tasks = data?.tasksEnabled !== "NONE";

    const sections = useMemo(
        () =>
            getSections(t, isAdmin, notifications, agreements, messages, tasks),
        [t, isAdmin, notifications, agreements, messages, tasks]
    );

    return (
        <>
            {sections.map((section) => (
                <DashboardSidebarSection
                    key={section.title}
                    path={currentPath}
                    sx={{
                        pt: 2,

                        width: "100%",
                        overflowY: "hidden",
                        textWrap: "nowrap",
                    }}
                    {...section}
                />
            ))}
        </>
    );
};

export default Sections;
