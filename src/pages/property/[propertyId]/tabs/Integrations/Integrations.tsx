import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
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
    useGetPropertyListingsQuery,
} from "src/services/properties";
import { ListingTypes } from "src/types/listings";
import { LabeledSwitch } from "../../components/Switch";
import { PublicSvg } from "src/assets/PublicSvg";
import { SpitogatosSvg } from "src/assets/SpitogatosSvg";
import RightMoveIcon from "src/assets/RightMoveIcon";
import FerimmoIcon from "@/assets/ferimmo";
import PlotGRIcon from "src/assets/plotgr";
import XEIcon from "src/assets/xrysh_eukairia";
import JamesEditionIcon from "@/assets/james_edition";
import { LocationDisplay } from "src/types/enums";
import GoogleEarth from "./GoogleEarth/GoogleEarth";
import PublicCard from "./PublicCard";

interface ListingCardProps {
    label: ListingTypes;
    value: boolean;
    onClick: (label: ListingTypes, value: boolean) => void;
}

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const handleClick = () => onClick(label, value);

    const icon =
        label === "PUBLIC_SITE" ? (
            <PublicSvg />
        ) : label === "SPITOGATOS" ? (
            <SpitogatosSvg />
        ) : label === "PLOTGR" ? (
            <PlotGRIcon />
        ) : label === "JAMES_EDITION" ? (
            <JamesEditionIcon />
        ) : label === "XRYSH_EUKAIRIA" ? (
            <XEIcon />
        ) : label === "RIGHTMOVE" ? (
            <RightMoveIcon />
        ) : label === "FERIMMO" ? (
            <FerimmoIcon />
        ) : (
            "here"
        );

    const text = (() => {
        switch (label) {
            case "SPITOGATOS":
                return "Spitogatos.gr";
            case "PLOTGR":
                return "plot.gr";
            case "JAMES_EDITION":
                return "jamesedition.com";
            case "XRYSH_EUKAIRIA":
                return "xe.gr";
            case "RIGHTMOVE":
                return "rightmove.co.uk";
            case "FERIMMO":
                return "ferimmo.de";
            default:
                return null;
        }
    })();

    return (
        <Stack p={5} direction="row" width="400px">
            <Box justifyItems="center" flex={1} flexDirection="column">
                {icon}
                <Typography>{text}</Typography>
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
    const { data: listings_2 } = useGetPropertyListingsQuery(+propertyId!);

    // INFO: property contains all listings (except publicSites)
    //       This will change eventually and everything will be moved to separate endpoint
    const listings = useMemo(() => property?.listings, [property?.listings]);

    const dispatch = useDispatch();

    // Mutations
    const [publishPublicSite] = useAddPublicListingMutation();
    const [unpublishPublicSite] = useRemovePublicListingMutation();
    const [publishSpitogatos] = useAddSpitogatosListingMutation();

    const invalidateTags = () =>
        dispatch(properties.util.invalidateTags(["PropertyByIdListings"]));

    const handlePublicClick = useCallback(async (p: boolean) => {
        try {
            if (p) await unpublishPublicSite(+propertyId!);
            else await publishPublicSite(+propertyId!);
            invalidateTags();
        } catch (err) {}
    }, []);

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

            {listings_2?.publicSites?.map(
                ({ publicSite: { id, siteUrl }, published }) => (
                    <PublicCard
                        key={id}
                        label={siteUrl}
                        published={published}
                        onClick={() => handlePublicClick(published)}
                    />
                )
            )}

            {/* {listings
                ? Object.keys(listings).map((key) => (
                      <ListingCard
                          key={key}
                          label={key as ListingTypes}
                          value={listings[key as ListingTypes]}
                          onClick={() => {}}
                      />
                  ))
                : null} */}

            <Box>
                <Typography variant="h4">Upload Google Earth</Typography>
                <GoogleEarth />
            </Box>
        </Paper>
    );
};

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
