import { Grid, MenuItem, Tooltip } from "@mui/material";
import * as React from "react";
import { LabelCreate } from "@/components/Label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { IGlobalProperty } from "src/types/global";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import Panel from "src/components/Panel";
import {
    RHFCheckbox,
    RHFOnlyNumbers,
    RHFSwitch,
    RHFTextField,
    Select,
} from "src/components/hook-form";
import Autocomplete from "../components/Autocomplete";
import { TranslationType } from "src/types/translation";
import { useFormContext } from "react-hook-form";
import Rent from "../_general/Rent";
import { ICustomerPOST } from "@/types/customer";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomerModal from "../_general/BasicDetails/CustomerModal";
import CustomerForm from "@/pages/customer/components/Form";
import RHFOnlyNumbersForPrice from "@/components/hook-form/RHFOnlyNumbersForPrice";
import { useGetPropertyByIdQuery } from "@/services/properties";

const getCHECKBOXES = (t: TranslationType) => [
    { name: "debatablePrice", label: t("Debatable Price") },
    { name: "buildable", label: t("Buildable") },
    { name: "auction", label: t("Auction") },
    {
        name: "details.legalAndTechnicalControl",
        label: t("Legal and Technical Control"),
    },
    {
        name: "details.irrigation",
        label: t("Irrigation"),
    },
    {
        name: "details.waterSupply",
        label: t("Water Supply"),
    },
    {
        name: "details.electricitySupply",
        label: t("Electricity Supply"),
    },
    {
        name: "details.hasBuildingPermit",
        label: t("Building Permit"),
    },
    {
        name: "details.hasBuilding",
        label: t("Contains Building"),
    },
];

const useEnums = () => {
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const stateEnum = enums?.state || [];
    return { enums, stateEnum };
};

const BasicForLandSection: React.FC<any> = () => {
    const router = useRouter();
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();
    const { enums, stateEnum } = useEnums();
    const { data: managers } = useAllUsersQuery();

    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!);

    const parentCategory = watch("parentCategory") || "";

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums?.residentialCategory || [],
            COMMERCIAL: enums?.commercialCategory || [],
            LAND: enums?.landCategory || [],
            OTHER: enums?.otherCategory || [],
        }),
        [enums]
    );

    const categories = useMemo(
        () => subCategoriesMap[parentCategory!] || [],
        [subCategoriesMap, parentCategory]
    );

    const CHECKBOXES = useMemo(() => getCHECKBOXES(t), [t]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [create, { isError: isOwnerError, isLoading: isOwnerLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(async (body: ICustomerPOST) => {
        const newOwnerId = await create(body).unwrap();
        handleClose();
        setValue("ownerId", newOwnerId);
    }, []);

    return (
        <>
            <Panel
                label={t("Basic Details")}
                endNode={<RHFSwitch name="exclusive" label={t("Exclusive")} />} // TODO: iOS switch
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <RHFTextField
                            fullWidth
                            name="code"
                            label={t("Code") + " *"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            disabled={!parentCategory}
                            label={t("Category")}
                            name="category"
                            options={categories}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFTextField
                            fullWidth
                            select
                            label={t("Manager")}
                            name="managerId"
                        >
                            <MenuItem value={""}>{t(`Not selected`)}</MenuItem>
                            {managers?.map(({ firstName, lastName, id }, i) => (
                                <MenuItem key={i} value={id}>
                                    {`${firstName} ${lastName}`}
                                </MenuItem>
                            ))}
                        </RHFTextField>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        display="flex"
                        width="100%"
                        direction="row"
                        alignItems="center"
                        gap={1}
                    >
                        <Autocomplete />
                        <Tooltip
                            title="Create a new Customer/Owner"
                            placement="top"
                        >
                            <AddOutlinedIcon
                                sx={{
                                    color: "blue",
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                    fontSize: "large",
                                    border: "1px solid blue",
                                    borderRadius: "50%",
                                }}
                                onClick={handleOpen}
                            />
                        </Tooltip>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Select
                            name="state"
                            label={t("State") + " *"}
                            options={stateEnum}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            fullWidth
                            name="area"
                            label={t("Living Space")}
                            adornment="m²"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            fullWidth
                            name="plotArea"
                            label={t("Plot Size")}
                            adornment="m²"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbersForPrice
                            fullWidth
                            name="price"
                            label={t("Price")}
                            adornment="€"
                            initialValue={data?.price}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFTextField
                            fullWidth
                            name="keyCode"
                            label={t("Key Code")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbersForPrice
                            fullWidth
                            name="estimatedRentPrice"
                            label={t("Estimated Rent Price")}
                            adornment="€"
                            initialValue={data?.estimatedRentPrice}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Plot Frontage")}
                            name={"details.plotFrontage"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Building Balance")}
                            name={"details.buildingBalance"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Total Construction")}
                            name={"details.totalConstruction"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Permissible Building Height")}
                            name={"details.permissibleBuildingHeight"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Permissible Floors")}
                            name={"details.permissibleFloors"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFOnlyNumbers
                            label={t("Setback Coefficient")}
                            name={"details.setbackCoefficient"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LabelCreate
                            variant="property"
                            resourceId={+propertyId!}
                        />
                    </Grid>

                    {CHECKBOXES.map((c, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                            <RHFCheckbox {...c} />
                        </Grid>
                    ))}
                </Grid>

                <Rent />
            </Panel>
            {open ? (
                <CustomerModal open={open} onClose={handleClose}>
                    <CustomerForm
                        isLoading={isOwnerLoading}
                        isError={isOwnerError}
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </CustomerModal>
            ) : null}
        </>
    );
};

export default BasicForLandSection;
