import { Paper, Stack } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useResponsive from "src/hooks/useResponsive";
import { useFilterLogsMutation } from "src/services/logs";
import { selectAll } from "src/slices/log";
import { FilterLogSection } from "./components/FilterSection";
import FilterMore from "@/components/Filters/FilterMore/Dialog";
import FloatingButton from "@/components/Filters/FilterMore/FloatingButton";
import LogCard from "@/components/Cards/LogCard";
import Pagination, { usePagination } from "@/components/Pagination";
import useDialog from "@/hooks/useDialog";
import NoLogsPlaceholder from "./components/NoLogs";
import { AdminGuard } from "@/components/authentication/admin-guard";

const pageSize = 15;

const Logs: NextPage = () => {
    const { t, i18n } = useTranslation();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const pagination = usePagination();

    const allFilters = useSelector(selectAll);

    const [filterLogs, { data, isLoading }] = useFilterLogsMutation();

    const isMobile = useResponsive("down", 500);

    useEffect(() => {
        filterLogs({
            filter: allFilters,
            page: pagination.page,
            pageSize,
            language: i18n.language,
        });
    }, [allFilters, pagination.page, pageSize, i18n.language]);

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data]
    );

    return (
        <>
            {isMobile ? (
                <FloatingButton
                    badgeContent={checkFields(allFilters) ? 1 : 0}
                    onClick={openDialog}
                />
            ) : (
                <Stack spacing={1} component={Paper} p={1}>
                    <FilterLogSection />
                </Stack>
            )}

            {content.length === 0 ? <NoLogsPlaceholder /> : null}

            {content.length > 0 ? (
                <Pagination
                    {...pagination}
                    isLoading={isLoading}
                    pageSize={pageSize}
                    totalItems={data?.totalElements ?? pageSize}
                    Container={Stack}
                    ContainerProps={{
                        spacing: 2,
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

Logs.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page} </AdminGuard>
    </DashboardLayout>
);

export default Logs;

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
