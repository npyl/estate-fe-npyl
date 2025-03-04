import { Chip, Grid } from "@mui/material";
import { format } from "date-fns"; // for date formatting
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import { useAllUsersQuery } from "src/services/user";
import { deleteFilter, getChangedFields, selectIds } from "src/slices/log";

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
            const user = users?.find((m) => m.id === userId);
            return user?.firstName && user.lastName
                ? `${user?.firstName} ${user?.lastName}`
                : "";
        },
        [users]
    );
    const getDisplayValue = useCallback(
        (key: any, values: any) => {
            let processedValues = values; // This will either remain an array or change based on the condition below

            // If 'values' is a single number, convert it to an array with one element for compatibility
            if (typeof values === "number") {
                processedValues = [values];
            }

            switch (key) {
                case "users":
                    // Now, 'processedValues' is guaranteed to be an array, whether it's a list of IDs or a single ID in an array
                    return processedValues
                        .map((id: number) => getUserName(id))
                        .join(", ");
                case "labels":
                    return getLabelNames(processedValues); // Same guarantee here
                // ... other cases ...
                default:
                    return Array.isArray(processedValues)
                        ? processedValues.join(", ")
                        : processedValues;
            }
        },
        [getUserName, getLabelNames] // include all functions used within the useCallback
    );
    // Adjusted logic to ensure date pair is treated as a single unit
    let dateRangeRendered = false;
    return (
        <Grid container direction="row">
            {ids.map((key) => {
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
                    const valuesToDisplay = getDisplayValue(key, values);
                    return (
                        <Chip
                            key={key} // Consider using something unique rather than 'index'
                            label={`${t(key)}: ${valuesToDisplay}`} // Assuming 't(key)' gets the correct label for the filter
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
