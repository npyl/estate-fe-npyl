import { Grid } from "@mui/material";
import Pagination, { usePagination } from "@/components/Pagination";
import PropertiesList from "./PropertiesList";
import useResponsive from "@/hooks/useResponsive";
import { useSelector } from "react-redux";
import { selectAll } from "@/slices/filters";
import { useFilterPropertiesQuery } from "@/services/properties";
import { FC } from "react";

interface PropertiesSectionProps {
    sortBy: string;
    direction: string;
}

const PropertiesSection: FC<PropertiesSectionProps> = ({
    sortBy,
    direction,
}) => {
    const pagination = usePagination();
    const belowSm = useResponsive("down", "sm");
    const belowLg = useResponsive("down", "lg");

    const pageSize = belowSm ? 5 : belowLg ? 10 : 25;

    const allFilters = useSelector(selectAll);

    const { data, isLoading } = useFilterPropertiesQuery({
        filter: allFilters,
        page: pagination.page,
        pageSize,
        sortBy: sortBy,
        direction: direction,
    });

    const properties = data?.content || [];
    const totalElements = data?.totalElements ?? pageSize;

    return (
        <Pagination
            {...pagination}
            pageSize={pageSize}
            totalItems={totalElements}
            isLoading={isLoading}
            Container={Grid}
            ContainerProps={{
                container: true,
                py: 2,
                spacing: 1,
            }}
        >
            <PropertiesList isLoading={isLoading} filtered={properties} />
        </Pagination>
    );
};

export default PropertiesSection;
