import { LocationOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Placeholder = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%" // or '65vh' or similar depending on your layout needs
            textAlign="center"
            color={(theme) => theme.palette.grey[500]}
        >
            {/* Optional: icon from @mui/icons-material or similar library */}
            <LocationOff style={{ fontSize: 70 }} color="action" />

            <Typography variant="h5" gutterBottom>
                No location data available
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
                Please check the property details or try again later.
            </Typography>

            {/* Optional: Call to action button */}
        </Box>
    );
};

export default Placeholder;
