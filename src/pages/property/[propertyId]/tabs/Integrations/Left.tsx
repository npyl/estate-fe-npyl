import {
    Button,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
    useEditLocationDisplayMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import { LocationDisplay } from "src/types/enums";

const Left = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);

    const defaultValue = useMemo(
        () =>
            property?.location?.locationDisplay?.key ||
            LocationDisplay.NOT_VISIBLE,
        [property]
    );

    const [locationDisplay, setLocationDisplay] = useState<LocationDisplay>();

    const [editLocationDisplay] = useEditLocationDisplayMutation();

    const handleUpdate = () =>
        editLocationDisplay({
            propertyId: +propertyId!,
            display: locationDisplay!,
        });

    return (
        <Paper
            elevation={10}
            sx={{
                padding: 2,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                mt={10}
                mb={10}
                sx={{ textAlign: "center" }}
            >
                Location Details
            </Typography>
            <Typography variant="body1" mb={5} sx={{ textAlign: "center" }}>
                Select which information will be visible to the user on Search
                result pages:
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="location"
                    defaultValue={defaultValue}
                    name="radio-buttons-group"
                    onChange={(_, v) =>
                        setLocationDisplay(v as LocationDisplay)
                    }
                >
                    <FormControlLabel
                        value={LocationDisplay.NOT_VISIBLE}
                        control={<Radio />}
                        label="Location not visible"
                    />
                    <FormControlLabel
                        value={LocationDisplay.GENERAL}
                        control={<Radio />}
                        label="General location (circle)"
                    />
                    <FormControlLabel
                        value={LocationDisplay.EXACT}
                        control={<Radio />}
                        label="Exact location (pin)"
                    />
                </RadioGroup>
            </FormControl>
            {!locationDisplay || locationDisplay === defaultValue ? null : (
                <Button
                    variant="contained"
                    sx={{ marginTop: 5 }}
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            )}
        </Paper>
    );
};

export default Left;
