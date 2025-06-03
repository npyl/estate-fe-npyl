import { useTranslation } from "react-i18next";
import Placeholder from "./Placeholder";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import PropertyCard from "@/components/Cards/PropertyCard";
import Pagination from "@/components/Pagination/client";
import { IProperties } from "@/types/properties";

interface MatchingPropertiesContentProps {
    page: number;
    pageSize: number;
    onChange: (_: any, p: number) => void;
    properties: IProperties[];
    isLoading?: boolean;
}

const MatchingPropertiesContent = ({
    properties,
    page,
    onChange,
    isLoading = false,
    pageSize,
}: MatchingPropertiesContentProps) => {
    const { t } = useTranslation();

    const belowLg = useResponsive("down", "lg");

    if (properties?.length === 0) {
        return <Placeholder />;
    }

    if (belowLg) {
        return (
            <Pagination
                page={page}
                onChange={onChange}
                isLoading={isLoading}
                pageSize={pageSize}
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
                page={page}
                pageSize={pageSize}
                onPaginationModelChange={(m) => onChange(null, m.page)}
            />
        </Panel>
    ) : null;
};

export default MatchingPropertiesContent;
