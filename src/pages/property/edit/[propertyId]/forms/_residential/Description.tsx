import { Checkbox, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFOnlyNumbers, Select } from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectHasAttic,
    selectPenthouse,
    selectPlayRoom,
    selectStoreroomBool,
    selectFloorApartment,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionSection: React.FC = () => {
    const { t } = useTranslation();

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const hasAttic = useSelector(selectHasAttic);
    const playroom = useSelector(selectPlayRoom);
    const penthouse = useSelector(selectPenthouse);
    const floorApartment = useSelector(selectFloorApartment);

    const storeroomBool = useSelector(selectStoreroomBool);

    return (
        <Panel label={"Property Description"}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Floor")}
                        name="details.floor"
                        options={details?.floors}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Bedrooms")}
                        name="details.bedrooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Layers")}
                        name="details.layers"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Kitchens")}
                        name="details.kitchens"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Living Rooms")}
                        name="details.livingRooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Number of WC")}
                        name="details.numOfWC"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Bathrooms")}
                        name="details.bathrooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("View")}
                        name="details.viewType"
                        options={details?.viewType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Accessibility")}
                        name={"details.accessibility"}
                        options={details?.accessibility}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Land Use")}
                        name={"details.landUse"}
                        options={details?.landUse}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Zone")}
                        name="details.zoneType"
                        options={details?.zoneType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Rooms")}
                        name="details.rooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Orientation")}
                        name="details.orientation"
                        options={details?.orientation}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Frontage")}
                        name="details.frontage"
                        placeholder="1,2,3..."
                    />
                </Grid>

                {/* Checkboxes */}
                <Grid item xs={2.4}>
                    <RHFCheckbox
                        label={t("Attic")}
                        name={"details.hasAttic"}
                        placeholder="Attic"
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <RHFCheckbox
                        name="details.playroom"
                        label={t("Playroom")}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <RHFCheckbox
                        name="details.storeroom"
                        label={t("Storeroom")}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <RHFCheckbox
                        name="details.penthouse"
                        label={t("Penthouse")}
                    />
                </Grid>

                <Grid item xs={2.4}>
                    <RHFCheckbox
                        name="details.floorApartment"
                        label={t("Floor Apartment")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default PropertyDescriptionSection;
