import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteFilter,
    getChangedFields,
    selectIds,
} from "src/slices/customer/filters";

const ChosenFilters = () => {
    const dispatch = useDispatch();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);
    const filterTags: Record<string, { label: string }> = {
        status: {
            label: "Status",
        },
        labels: {
            label: "Labels",
        },
        roles: {
            label: "Roles",
        },
        parentCategories: {
            label: "Categories",
        },
        categories: {
            label: "Subcategory",
        },
    };

    return (
        <Grid container direction="row">
            {ids.map((key, index) => {
                const values = changedProps[key];
                let label = filterTags[key].label;

                if (!values || !label) return <></>;

                return (
                    <Chip
                        key={index}
                        label={
                            <Stack direction="row">
                                <Typography
                                    sx={{
                                        fontWeight: "medium",
                                        paddingRight: 1,
                                    }}
                                >
                                    {label}:
                                </Typography>
                                <Typography sx={{ textTransform: "lowercase" }}>
                                    {Array.isArray(values)
                                        ? values.join(", ")
                                        : values}
                                </Typography>
                            </Stack>
                        }
                        onDelete={() => {
                            dispatch(deleteFilter(key));
                        }}
                        sx={{ m: 0.5 }}
                    />
                );
            })}
        </Grid>
    );
};

export default ChosenFilters;
