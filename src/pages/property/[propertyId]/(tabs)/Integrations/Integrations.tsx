import { Grid } from "@mui/material";
import Left from "./Left";
import Right from "./Right";

const Integrations = () => (
    <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100%" }}
    >
        <Grid item xs={12} sm={6}>
            <Left />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Right />
        </Grid>
    </Grid>
);

export default Integrations;
