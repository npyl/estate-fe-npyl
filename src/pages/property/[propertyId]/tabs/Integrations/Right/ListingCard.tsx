import { Stack, Typography } from "@mui/material";
import { ListingTypes } from "src/types/listings";
import { LabeledSwitch } from "./Switch";
import SpitogatosSvg from "src/assets/SpitogatosSvg";
import RightMoveIcon from "src/assets/RightMoveIcon";
import FerimmoIcon from "@/assets/ferimmo";
import PlotGRIcon from "src/assets/plotgr";
import XEIcon from "src/assets/xrysh_eukairia";
import JamesEditionIcon from "@/assets/james_edition";
import { useAddSpitogatosListingMutation } from "@/services/listings";

interface ListingCardProps {
    label: ListingTypes;
    value: boolean;
    onClick: (label: ListingTypes, value: boolean) => void;
}

const ListingCard = ({ label, value, onClick }: ListingCardProps) => {
    const [publishSpitogatos] = useAddSpitogatosListingMutation();

    const icon =
        label === "SPITOGATOS" ? (
            <SpitogatosSvg width={36} height={36} />
        ) : label === "PLOT_GR" ? (
            <PlotGRIcon width={30} height={30} />
        ) : label === "JAMES_EDITION" ? (
            <JamesEditionIcon width={30} height={30} />
        ) : label === "XE" ? (
            <XEIcon width={30} height={30} />
        ) : label === "RIGHT_MOVE" ? (
            <RightMoveIcon />
        ) : label === "FERIMMO" ? (
            <FerimmoIcon width={30} height={30} />
        ) : (
            label
        );

    const text = (() => {
        switch (label) {
            case "SPITOGATOS":
                return "Spitogatos.gr";
            case "PLOT_GR":
                return "plot.gr";
            case "JAMES_EDITION":
                return "jamesedition.com";
            case "XE":
                return "xe.gr";
            case "RIGHT_MOVE":
                return "rightmove.co.uk";
            case "FERIMMO":
                return "ferimmo.de";
            default:
                return null;
        }
    })();

    return (
        <Stack direction="row" minWidth="400px" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
                {icon}

                <Typography>{text}</Typography>
            </Stack>

            <LabeledSwitch
                checked={value}
                labelOn="Published"
                labelOff="Unpublished"
                onChange={() => onClick(label, value)}
                name="checkedA"
            />
        </Stack>
    );
};

export default ListingCard;
