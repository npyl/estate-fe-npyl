import { Stack } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFilterLogsQuery } from "src/services/logs";
import { selectAll, sumOfChangedProperties } from "@/slices/log";
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
import ChosenFiltersLogs from "./components/Filters/ChoosenFiltersLogs";

const pageSize = 15;

const ChosenFilters = () => {
    const changed = useSelector(sumOfChangedProperties);

    if (changed === 0) return null;

    return <ChosenFiltersLogs />;
};

const ViewAll = () => {
    const { i18n } = useTranslation();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const pagination = usePagination();

    const filter = useSelector(selectAll);

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

    return (
        <>
            <FloatingButton
                badgeContent={checkFields(filter) ? 1 : 0}
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

function checkFields(obj: any) {
    // List of fields to check in the object
    const fieldsToCheck = [
        "resources",
        "actions",
        "users",
        "fromDate",
        "toDate",
    ];

    // Iterate over the list of fields
    for (let field of fieldsToCheck) {
        const value = obj[field];

        // Check if the field exists
        if (value !== undefined) {
            // Check if it's an array with length > 0 or a non-array value
            if (Array.isArray(value) ? value.length > 0 : true) {
                return true; // Return true if the field meets the criteria
            }
        }
    }

    // Return false if none of the fields meet the criteria
    return false;
}

export default ViewAll;
