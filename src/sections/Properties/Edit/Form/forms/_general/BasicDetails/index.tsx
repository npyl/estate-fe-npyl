import { Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LabelSection from "@/ui/LabelSection";
import Panel from "@/components/Panel";
import {
    RHFSwitch,
    RHFOnlyNumbers,
    Select,
    RHFCheckbox,
} from "src/components/hook-form";
import Rent from "../Rent";
import { useGetPropertyByIdQuery } from "@/services/properties";
import useEnums from "./useEnums";
import CategorySelect from "./CategorySelect";
import OwnerSelect from "../../_shared/OwnerSelect";
import RHFCode from "../RHFCode";
import RHFKeyCode from "../RHFKeyCode";
import RHFManagerAutocomplete from "@/ui/Autocompletes/RHFManager";
import { PROPERTY } from "@/constants/tests";

const BasicSection = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { stateEnum } = useEnums();

    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!);

    return (
        <Panel
            label={t("BasicSection")}
            endNode={<RHFSwitch name="exclusive" label={t("Exclusive")} />}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <RHFCode
                        data-testid={PROPERTY.CODE_ID}
                        fullWidth
                        name="code"
                        label={t("Code") + " *"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CategorySelect />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFManagerAutocomplete name="managerId" />
                </Grid>
                {/* OWNER */}
                <OwnerSelect />
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="area"
                        label={t("Living Space")}
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        data-testid={PROPERTY.STATE_ID}
                        isEnum
                        name="state"
                        label={t("State") + " *"}
                        options={stateEnum}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Stack direction="row" gap={3}>
                        <RHFOnlyNumbers
                            fullWidth
                            name="price"
                            label={t("Price")}
                            adornment="€"
                        />

                        <RHFCheckbox
                            name="hidePrice"
                            sx={{ textWrap: "nowrap" }}
                            label={t("Hide Price")}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="plotArea"
                        label={t("Plot Size")}
                        adornment="m²"
                    />
                </Grid>
                {data?.parentCategory.key !== "COMMERCIAL" && (
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            fullWidth
                            name="details.buildingBalance"
                            label={t("Building Balance")}
                            adornment="m²"
                        />
                    </Grid>
                )}
                <Grid item xs={12} sm={6}>
                    <LabelSection
                        variant="property"
                        resourceId={+propertyId!}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="averageUtils"
                        label={t("Average Utils")}
                        adornment={t<string>("EURO_PER_MONTH")}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="estimatedRentPrice"
                        label={t("Estimated Rent Price")}
                        adornment="€"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFKeyCode
                        fullWidth
                        name="keyCode"
                        label={t("Key Code")}
                    />
                </Grid>
            </Grid>

            <Rent />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <RHFCheckbox
                        name="debatablePrice"
                        label={t("Debatable Price")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFCheckbox name="auction" label={t("Auction")} />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default BasicSection;
