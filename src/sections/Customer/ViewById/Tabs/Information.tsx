import Grid from "@mui/material/Grid";
import { Address, Information } from "../sections";
import NoteSection from "@/ui/Note/Section";

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
            <NoteSection chip resource="customer" />
        </Grid>
    </Grid>
);

export default CustomerInformation;
