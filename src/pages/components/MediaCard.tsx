"use client";
import { BoxProps, Grid } from "@mui/material";
import { IPropertyResultResponse } from "src/types/properties";
import { BookingItem } from "./BookingItem";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    title?: string;
    subheader?: string;
    data: IPropertyResultResponse[];
}

export default function MediaCard({ data, sx, ...other }: Props) {
    return (
        <Grid container sx={{ pb: 2, ...sx }}>
            {data.map((item, index) => (
                <Grid item key={index} xs={12} sm={4}>
                    <BookingItem item={item} />
                </Grid>
            ))}
        </Grid>
    );
}
