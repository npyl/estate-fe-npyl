import {
    Button,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useEditLocationDisplayMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import { LocationDisplay } from "src/types/enums";

const Left = () => {
    const { t } = useTranslation();

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
            component={Stack}
            p={2}
            px={4}
            alignItems="center"
        >
            <Typography variant="h4" mt={10} mb={10} textAlign="center">
                {t("Location Details")}:
            </Typography>
            <Typography variant="body1" mb={5} sx={{ textAlign: "center" }}>
                {t(
                    "Select which information will be visible to the user on Search result pages:"
                )}
            </Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    defaultValue={defaultValue}
                    name="radio-buttons-group"
                    onChange={(_, v) =>
                        setLocationDisplay(v as LocationDisplay)
                    }
                >
                    <FormControlLabel
                        value={LocationDisplay.NOT_VISIBLE}
                        control={<Radio />}
                        label={t("Location not visible")}
                    />
                    <FormControlLabel
                        value={LocationDisplay.GENERAL}
                        control={<Radio />}
                        label={t("General location (circle)")}
                    />
                    <FormControlLabel
                        value={LocationDisplay.EXACT}
                        control={<Radio />}
                        label={t("Exact location (pin)")}
                    />
                </RadioGroup>
            </FormControl>
            {!locationDisplay || locationDisplay === defaultValue ? null : (
                <Button
                    variant="contained"
                    sx={{ marginTop: 5 }}
                    onClick={handleUpdate}
                >
                    {t("Update")}
                </Button>
            )}
        </Paper>
    );
};

export default Left;
