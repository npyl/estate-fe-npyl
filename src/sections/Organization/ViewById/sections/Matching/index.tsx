import { useTranslation } from "react-i18next";
import Placeholder from "./Placeholder";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import PropertyCard from "@/components/Cards/PropertyCard";
import { usePagination } from "@/components/Pagination";
import Pagination from "@/components/Pagination/client";
import { IProperties } from "@/types/properties";

const PAGE_SIZE = 5;
interface MatchingPropertiesSectionProps {
    properties: IProperties[];
}
const MatchingPropertiesSection = ({
    properties,
}: MatchingPropertiesSectionProps) => {
    const { t } = useTranslation();
    const belowLg = useResponsive("down", "lg");
    const pagination = usePagination();

    const isLoading = false;

    if (properties?.length === 0) {
        return <Placeholder />;
    }

    if (belowLg) {
        return (
            <Pagination
                {...pagination}
                isLoading={isLoading}
                pageSize={PAGE_SIZE}
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {properties.map((p) => (
                    <Grid item key={p.id} xs={12} sm={6}>
                        <PropertyCard item={p} />
                    </Grid>
                ))}
            </Pagination>
        );
    }

    return properties?.length > 0 ? (
        <Panel label={t("Matching Properties")} childrenSx={{ p: 0 }}>
            <DataGrid
                loading={isLoading}
                rows={properties}
                totalRows={properties?.length}
                paginationMode="client"
                page={pagination.page}
                pageSize={PAGE_SIZE}
                onPaginationModelChange={(m) =>
                    pagination.onChange(null, m.page)
                }
            />
        </Panel>
    ) : null;
};

export default MatchingPropertiesSection;
