import Grid from "@mui/material/Grid";
import Address from "./Address";
import Notes from "./Notes";
import Information from "./Section";

const CustomerInformation = () => (
    <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
            <Information />
        </Grid>
        <Grid
            item
            xs={12}
            lg={6}
            // ...
            display="flex"
            flexDirection="column"
            gap={1}
        >
            <Address />
            <Notes />
        </Grid>
    </Grid>
);

export default CustomerInformation;
