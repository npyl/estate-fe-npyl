import {
    Box,
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
import { useDispatch } from "react-redux";
import {
    useAddPublicListingMutation,
    useAddSpitogatosListingMutation,
    useRemovePublicListingMutation,
} from "src/services/listings";
import {
    properties,
    useEditLocationDisplayMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import { ListingTypes } from "src/types/listings";
import { LabeledSwitch } from "../../components/Switch";
import { PublicSvg } from "src/assets/PublicSvg";
import { SpitogatosSvg } from "src/assets/SpitogatosSvg";
import { LocationDisplay } from "src/types/enums";
import GoogleEarth from "./GoogleEarth/GoogleEarth";

interface ListingCardProps {
    label: ListingTypes;
    value: boolean;
    onClick: (label: ListingTypes, value: boolean) => void;
}

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const handleClick = () => onClick(label, value);

    return (
        <Stack p={5} direction="row" width="400px">
            <Box justifyItems="center" flex={1} flexDirection="column">
                {label === "PUBLIC_SITE" ? <PublicSvg /> : <SpitogatosSvg />}
                <Typography>
                    {label === "PUBLIC_SITE" ? "Public" : "Spitogatos.gr"}
                </Typography>
            </Box>

            <LabeledSwitch
                checked={value}
                labelOn="Published"
                labelOff="Unpublished"
                onChange={handleClick}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
            />
        </Stack>
    );
};

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

const Right = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const listings = useMemo(() => property?.listings, [property?.listings]);

    const dispatch = useDispatch();

    // Mutations
    const [publishPublicSite] = useAddPublicListingMutation();
    const [unpublishPublicSite] = useRemovePublicListingMutation();
    const [publishSpitogatos] = useAddSpitogatosListingMutation();

    const invalidateTags = () =>
        dispatch(properties.util.invalidateTags(["PropertyById"]));

    const handleClick = (key: ListingTypes, published: boolean) => {
        if (published) {
            key === "PUBLIC_SITE" &&
                unpublishPublicSite(+propertyId!).then(invalidateTags);
        } else {
            key === "PUBLIC_SITE" &&
                publishPublicSite(+propertyId!).then(invalidateTags);
            key === "SPITOGATOS" &&
                publishSpitogatos(+propertyId!).then(invalidateTags);
        }
    };

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
                opacity: 1,
                backgroundColor: "background.paper",
            }}
        >
            <Typography
                variant="h4"
                mt={10}
                mb={5}
                sx={{ textAlign: "center" }}
            >
                Websites to publish to:
            </Typography>

            {listings &&
                Object.keys(listings).map((key) => (
                    <ListingCard
                        key={key}
                        label={key as ListingTypes}
                        value={listings[key as ListingTypes]}
                        onClick={handleClick}
                    />
                ))}

            <Box>
                <Typography variant="h4">Upload Google Earth</Typography>
                <GoogleEarth />
            </Box>
        </Paper>
    );
};

const Integrations = () => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height={1}
        spacing={1}
    >
        <Left />
        <Right />
    </Stack>
);

export default Integrations;
