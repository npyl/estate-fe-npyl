import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";

interface FieldProps extends PropsWithChildren {
    label: string;
}

const Field: FC<FieldProps> = ({ label, children }) => (
    <Grid container display="flex" alignItems="center" spacing={1}>
        <Grid xs={3}>
            <Typography>{label}</Typography>
        </Grid>
        <Grid xs={9}>{children}</Grid>
    </Grid>
);

export default Field;
