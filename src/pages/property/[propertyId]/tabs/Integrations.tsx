import { Box, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
    useAddPublicListingMutation,
    useAddSpitogatosListingMutation,
    useRemovePublicListingMutation,
} from "src/services/listings";
import { properties, useGetPropertyByIdQuery } from "src/services/properties";
import { ListingTypes } from "src/types/listings";

interface ListingCardProps {
    label: ListingTypes;
    value: boolean;
    onClick: (label: ListingTypes, value: boolean) => void;
}

const renderValue = (value: boolean) => (value ? "Published" : "No");

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const handleClick = () => onClick(label, value);

    return (
        <Box p={5} border={1} borderRadius={1}>
            {`${label}: ${renderValue(value)}`}

            <Button variant="text" onClick={handleClick}>
                {value ? "Unpublish" : "Publish"}
            </Button>
        </Box>
    );
};

const Integrations = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const listings = useMemo(() => property?.listings, [property?.listings]);

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
        <Paper elevation={10} sx={{ overflow: "auto", padding: "10px" }}>
            {listings &&
                Object.keys(listings).map((key) => (
                    <ListingCard
                        key={key}
                        label={key as ListingTypes}
                        value={listings[key as ListingTypes]}
                        onClick={handleClick}
                    />
                ))}
        </Paper>
    );
};

export default Integrations;
