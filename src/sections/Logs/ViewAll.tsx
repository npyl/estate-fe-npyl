import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFilterLogsQuery } from "src/services/logs";
import { FilterLogSection } from "./components/FilterSection";
const FilterMore = dynamic(
    () => import("@/sections/Filters/FilterMore/Dialog")
);
import FloatingButton from "@/sections/Filters/FilterMore/FloatingButton";
import LogCard from "@/components/Cards/LogCard";
import Pagination, { usePagination } from "@/components/Pagination";
import useDialog from "@/hooks/useDialog";
import NoLogsPlaceholder from "./components/NoLogs";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";
import ChosenFiltersLogs from "./components/Filters/ChosenFilters";
import LogsFiltersProvider, {
    useSelectAll,
    useSelectSumOfChangedProperties,
} from "./components/Filters/Context";

const pageSize = 15;

const ChosenFilters = () => {
    const changed = useSelectSumOfChangedProperties();
    if (changed === 0) return null;
    return <ChosenFiltersLogs />;
};

const Content = () => {
    const { i18n } = useTranslation();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const pagination = usePagination();

    const filter = useSelectAll();

    const { data, isLoading } = useFilterLogsQuery({
        filter,
        page: pagination.page,
        pageSize,
        language: i18n.language,
    });

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data]
    );

    const changed = useSelectSumOfChangedProperties();

    return (
        <>
            <FloatingButton
                badgeContent={changed}
                onClick={openDialog}
                sx={{
                    display: {
                        xs: "block",
                        lg: "none",
                    },
                }}
            />

            <FiltersBar
                filters={<FilterLogSection />}
                bottomContent={<ChosenFilters />}
            />

            {content.length === 0 ? <NoLogsPlaceholder /> : null}

            {content.length > 0 ? (
                <Pagination
                    {...pagination}
                    isLoading={isLoading}
                    pageSize={pageSize}
                    totalItems={data?.totalElements ?? pageSize}
                    Container={Stack}
                    ContainerProps={{
                        spacing: 1,
                        mt: 1,
                    }}
                >
                    {content.map((log, index) => (
                        <LogCard key={index} log={log} />
                    ))}
                </Pagination>
            ) : null}

            {isDialogOpen ? (
                <FilterMore
                    open={isDialogOpen}
                    onClose={closeDialog}
                    onResetFilter={() => {}}
                >
                    <FilterLogSection />
                </FilterMore>
            ) : null}
        </>
    );
};

interface ViewAllProps {
    propertyId?: number;
    customerId?: number;
}

const ViewAll: FC<ViewAllProps> = (props) => (
    <LogsFiltersProvider {...props}>
        <Content />
    </LogsFiltersProvider>
);

export default ViewAll;
