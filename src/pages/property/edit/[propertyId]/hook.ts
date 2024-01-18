import { useMemo } from "react";
import {
    IProperties,
    IPropertiesPOST,
    IPropertyHeatingAndEnergyPOST,
    IPropertyTechnicalFeaturesPOST,
} from "src/types/properties";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IPropertyDetailsPOST } from "src/types/details";
import { properties } from "src/services/properties";
import { dispatch } from "src/store";

interface DetailsYup extends Partial<IPropertyDetailsPOST> {}
interface HeatingAndEnergyYup extends Partial<IPropertyHeatingAndEnergyPOST> {}
interface TechnicalFeaturesYup
    extends Partial<IPropertyTechnicalFeaturesPOST> {}

// required fields
interface IPropertyYup
    extends Partial<
        Omit<
            IPropertiesPOST,
            "details" | "heatingAndEnergy" | "technicalFeatures"
        >
    > {
    code: string;
    state: string;

    details?: DetailsYup;
    heatingAndEnergy?: HeatingAndEnergyYup;
    technicalFeatures?: TechnicalFeaturesYup;
}

// Custom validation function
const codeIsUnique = async (code?: string) => {
    if (!code) return true;

    try {
        const promise = dispatch(
            properties.endpoints.checkCodeExists.initiate(code)
        );
        const { data: exists } = await promise;

        // Removing the corresponding cache subscription
        promise.unsubscribe();

        return !exists;
    } catch (error) {
        console.error("Error in API call:", error);
        return false;
    }
};

// Custom validation function
const keyCodeIsUnique = async (code?: string) => {
    if (!code) return true;

    try {
        const promise = dispatch(
            properties.endpoints.checkKeyCodeExists.initiate(code)
        );
        const { data: exists } = await promise;

        // Removing the corresponding cache subscription
        promise.unsubscribe();

        return !exists;
    } catch (error) {
        console.error("Error in API call:", error);
        return false;
    }
};

const LoginSchema = Yup.object().shape({
    code: Yup.string()
        .test(
            "codeIsUnique",
            "Code already exists",
            async (value) => await codeIsUnique(value)
        )
        .required(),
    keyCode: Yup.string().test(
        "keyCodeIsUnique",
        "Key Code already exists",
        async (value) => await keyCodeIsUnique(value)
    ),
    state: Yup.string().required(),
});

const getEnumKey = (key?: string, fix?: boolean) =>
    key || (fix ? undefined : "");

const getDropdowns = (property?: IProperties) => ({
    category: getEnumKey(property?.category?.key),
    parentCategory: getEnumKey(property?.parentCategory?.key),

    details: {
        orientation: getEnumKey(property?.details?.orientation?.key),
        accessibility: getEnumKey(property?.details?.accessibility?.key),
        landUse: getEnumKey(property?.details?.landUse?.key),
        floor: getEnumKey(property?.details?.floor?.key),
        zoneType: getEnumKey(property?.details?.zoneType?.key),
        viewType: getEnumKey(property?.details?.viewType?.key),
    },

    heatingAndEnergy: {
        electricityType: getEnumKey(
            property?.heatingAndEnergy?.electricityType?.key
        ),
        heatingSystem: getEnumKey(
            property?.heatingAndEnergy?.heatingSystem?.key
        ),
        energyClass: getEnumKey(property?.heatingAndEnergy?.energyClass?.key),
        heatingType: getEnumKey(property?.heatingAndEnergy?.heatingType?.key),
    },

    technicalFeatures: {
        floorType: getEnumKey(property?.technicalFeatures?.floorType?.key),
        frameType: getEnumKey(property?.technicalFeatures?.frameType?.key),
        furnished: getEnumKey(property?.technicalFeatures?.furnished?.key),
        paneGlassType: getEnumKey(
            property?.technicalFeatures?.paneGlassType?.key
        ),
        inclination: getEnumKey(property?.technicalFeatures?.inclination?.key),
    },
});

export const fixDropdowns = (property?: IPropertiesPOST) => ({
    category: getEnumKey(property?.category, true),
    parentCategory: getEnumKey(property?.parentCategory, true),

    details: {
        orientation: getEnumKey(property?.details?.orientation, true),
        accessibility: getEnumKey(property?.details?.accessibility, true),
        landUse: getEnumKey(property?.details?.landUse, true),
        floor: getEnumKey(property?.details?.floor, true),
        zoneType: getEnumKey(property?.details?.zoneType, true),
        viewType: getEnumKey(property?.details?.viewType, true),
    },

    heatingAndEnergy: {
        electricityType: getEnumKey(
            property?.heatingAndEnergy?.electricityType,
            true
        ),
        heatingSystem: getEnumKey(
            property?.heatingAndEnergy?.heatingSystem,
            true
        ),
        energyClass: getEnumKey(property?.heatingAndEnergy?.energyClass, true),
        heatingType: getEnumKey(property?.heatingAndEnergy?.heatingType, true),
    },

    technicalFeatures: {
        floorType: getEnumKey(property?.technicalFeatures?.floorType, true),
        frameType: getEnumKey(property?.technicalFeatures?.frameType, true),
        furnished: getEnumKey(property?.technicalFeatures?.furnished, true),
        paneGlassType: getEnumKey(
            property?.technicalFeatures?.paneGlassType,
            true
        ),
        inclination: getEnumKey(property?.technicalFeatures?.inclination, true),
    },
});

const getDefaultValues = (property?: IProperties): IPropertyYup => ({
    code: property?.code || "",
    state: property?.state?.key || "",
    keyCode: property?.keyCode || "",

    ...getDropdowns(property),
});

const usePropertyForm = (property?: IProperties) => {
    const defaultValues = useMemo(() => getDefaultValues(property), [property]);

    const methods = useForm<IPropertyYup>({
        resolver: yupResolver(LoginSchema),
        values: defaultValues,
    });

    const { reset, handleSubmit } = methods;

    return { methods, handleSubmit, reset };
};

export default usePropertyForm;
