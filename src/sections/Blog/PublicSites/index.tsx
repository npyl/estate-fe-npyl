import DataGrid from "@/components/DataGrid";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import getColumns from "./columns";
import { useGetPublicSitesQuery } from "@/services/company";

const ViewAllPublicSites = () => {
    const { t } = useTranslation();
    const columns = useMemo(() => getColumns(t), [t]);
    const { data, isLoading } = useGetPublicSitesQuery();
    return (
        <DataGrid
            resource="blog"
            loading={isLoading}
            columns={columns}
            rows={data ?? []}
            page={0}
            pageSize={5}
            totalRows={data?.length ?? 5}
        />
    );
};

export default ViewAllPublicSites;
