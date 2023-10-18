import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import { useAllUsersQuery } from "src/services/user";
import { deleteFilter, getChangedFields, selectIds } from "src/slices/log";
import { format } from "date-fns"; // for date formatting
const ChosenFiltersLogs = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: labelsQuery } = useGetLabelsQuery();
    const { data: users } = useAllUsersQuery();
    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    const allLabels = useMemo(
        () => labelsQuery?.customerLabels || [],
        [labelsQuery?.customerLabels]
    );

    const getLabelNames = useCallback(
        (labelIds: any[]) =>
            labelIds
                .map((id) => {
                    const label = allLabels.find((label) => label.id === id);
                    return label ? label.name : "Unknown";
                })
                .join(", "),
        [allLabels]
    );

    const getUserName = useCallback(
        (userId: number) => {
            const user = users?.find((user) => user.id === userId);
            return user ? `${user.firstName} ${user.lastName}` : "Unknown";
        },
        [users]
    );

    // New function to check for date pairs
    const hasDatePair = (key: string) => ["fromDate", "toDate"].includes(key);
    // Adjusted logic to ensure date pair is treated as a single unit
    let dateRangeRendered = false;
    return (
        <Grid container direction="row">
            {ids.map((key, index) => {
                // Special handling for date range, ensuring it's rendered only once
                if (
                    !dateRangeRendered &&
                    (key === "fromDate" || key === "toDate")
                ) {
                    dateRangeRendered = true; // Set the flag so it doesn't render again

                    const fromDate = changedProps["fromDate"];
                    const toDate = changedProps["toDate"];
                    if (!fromDate || !toDate) return null; // Ensure both dates are present

                    const formatFromDate = format(
                        new Date(fromDate),
                        "dd-MM-yyyy hh:mm"
                    );
                    const formatToDate = format(
                        new Date(toDate),
                        "dd-MM-yyyy hh:mm"
                    );
                    const dateLabel = t("Date Range"); // localized label

                    return (
                        <Chip
                            key={"date-range-chip"} // Unique key for the date range chip
                            label={`${dateLabel}: ${formatFromDate} - ${formatToDate}`}
                            onDelete={() => {
                                dispatch(deleteFilter("fromDate"));
                                dispatch(deleteFilter("toDate"));
                            }}
                            sx={{ m: 0.5 }}
                        />
                    );
                }

                // For non-date filters, we proceed as normal
                if (key !== "fromDate" && key !== "toDate") {
                    const values = changedProps[key];
                    if (!values) return null;

                    const label = key === "users" ? t("User") : t("Other");
                    let valuesToDisplay = Array.isArray(values)
                        ? values.join(", ")
                        : values;

                    if (key === "users" && typeof values === "number") {
                        valuesToDisplay = getUserName(values);
                    }

                    if (key === "labels") {
                        valuesToDisplay = getLabelNames(values);
                    }

                    return (
                        <Chip
                            key={index}
                            label={`${label}: ${valuesToDisplay}`}
                            onDelete={() => dispatch(deleteFilter(key))}
                            sx={{ m: 0.5 }}
                        />
                    );
                }

                return null; // Prevent rendering for unmatched cases
            })}
        </Grid>
    );
};

export default ChosenFiltersLogs;
