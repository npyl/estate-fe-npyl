import {
    Box,
    Paper,
    Stack,
    Switch,
    SwitchProps,
    Typography,
    styled,
} from "@mui/material";
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

const PublicSvg: React.FC = () => {
    return (
        <svg
            width="36px"
            height="36px"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="3"
            stroke="#000000"
            fill="none"
        >
            <path d="M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6" />
            <path d="M37.86,51.1A47,47,0,0,1,32,56.7" />
            <path d="M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85" />
            <path d="M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24" />
            <line x1="10.37" y1="19.9" x2="53.75" y2="19.9" />
            <line x1="32" y1="6.99" x2="32" y2="56.7" />
            <line x1="11.05" y1="45.48" x2="37.04" y2="45.48" />
            <line x1="7.14" y1="32.46" x2="56.86" y2="31.85" />
            <path d="M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z" />
        </svg>
    );
};

const SpitogatosSvg: React.FC = () => {
    return (
        <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="36px"
            height="36px"
            fill="orange"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
        >
            <g>
                <path
                    d="M481.875,299.344L512,292.219l-4.656-19.641l-24.25,5.734c0-0.328,0.016-0.641,0.016-0.969
            c0-38.078-10.531-72.781-28.969-102.359c15.438-53.938-13.438-124.547-13.438-124.547S387.813,73,357.719,100.297
            C327.109,91.063,292.578,88.094,256,88.094c-36.766,0-71.484,2.563-102.203,11.781c-30.156-27.109-82.5-49.438-82.5-49.438
            S42.406,121.063,57.859,175c-18.422,29.578-28.984,64.281-28.984,102.344c0,0.328,0.031,0.641,0.031,0.969l-24.25-5.734L0,292.219
            l30.109,7.125c2.672,23.578,9.672,44.75,20.234,63.422L12.875,377.75l7.484,18.75l41.203-16.484
            c39.797,53.141,111.969,81.547,194.438,81.547c82.453,0,154.641-28.406,194.438-81.547l41.203,16.484l7.484-18.75l-37.469-14.984
            C472.219,344.094,479.219,322.922,481.875,299.344z"
                />
            </g>
        </svg>
    );
};

interface LabeledSwitchProps extends SwitchProps {
    labelOff: string;
    labelOn: string;
}

const LabeledSwitch = styled(Switch)<LabeledSwitchProps>(
    ({ theme, labelOn, labelOff }) => ({
        width: "140px",
        height: "50px",
        padding: "0px",

        "& .MuiSwitch-switchBase": {
            color: "#818181",
            padding: "1px",
            "&.Mui-checked": {
                color: theme.palette.success.main,
                "& + .MuiSwitch-track": {
                    backgroundColor: theme.palette.success.main,
                },
                "& .MuiSwitch-thumb": {
                    color: theme.palette.background.paper,
                },
                "& + .MuiSwitch-track:before": {
                    opacity: 0,
                },
                "& + .MuiSwitch-track:after": {
                    opacity: 1,
                },
            },
        },
        "& .MuiSwitch-thumb": {
            color: "white",
            borderRadius: 5,
            width: "35px",
            height: "46px",
            margin: "1px",
        },
        "& .MuiSwitch-track": {
            backgroundColor: "#818181",
            opacity: 1,
            "&:before, &:after": {
                content: '""',
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                fontSize: 15,
            },
            "&:before": {
                right: 8,
                content: `"${labelOff}"`,
            },
            "&:after": {
                left: 8,
                content: `"${labelOn}"`,
                opacity: 0,
            },
        },
        "& .Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#23bf58",
        },
        "& .Mui-checked .MuiSwitch-thumb": {
            color: "#23bf58",
        },
        "& .Mui-checked": {
            transform: "translateX(101px)",
        },
    })
);

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const handleClick = () => onClick(label, value);

    return (
        <Stack
            p={5}
            border={1}
            borderRadius={1}
            direction={"row"}
            maxWidth={"30%"}
        >
            <Box justifyItems={"center"} flex={1} flexDirection={"column"}>
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
            <Stack gap={1}>
                {listings &&
                    Object.keys(listings).map((key) => (
                        <ListingCard
                            key={key}
                            label={key as ListingTypes}
                            value={listings[key as ListingTypes]}
                            onClick={handleClick}
                        />
                    ))}
            </Stack>
        </Paper>
    );
};

export default Integrations;
function useStyles() {
    throw new Error("Function not implemented.");
}
