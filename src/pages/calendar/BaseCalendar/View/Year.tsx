import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { BaseCalendarYearViewProps } from "../types";

const months = Array.from({ length: 12 });

const YearView: FC<BaseCalendarYearViewProps> = ({ date }) => {
    const year = date.getFullYear();

    return (
        <Grid container>
            {months.map((_, i) => (
                <Grid key={i} item xs={3}>
                    <Typography textAlign="center" p={1}>
                        {new Date(year, i, 1).toLocaleString("default", {
                            month: "long",
                        })}
                    </Typography>
                    <Box height="200px">...</Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default YearView;
