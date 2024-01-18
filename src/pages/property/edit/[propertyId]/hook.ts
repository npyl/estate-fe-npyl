import { useMemo } from "react";
import {
    IProperties,
    IPropertiesPOST,
    IPropertyConstructionPOST,
    IPropertyHeatingAndEnergyPOST,
    IPropertySuitableFor,
    IPropertyTechnicalFeaturesPOST,
} from "src/types/properties";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IPropertyDetailsPOST } from "src/types/details";
import { properties } from "src/services/properties";
import { dispatch } from "src/store";
import { LocationDisplay } from "src/types/enums";
import { IPropertyFeatures } from "src/types/features";

interface DetailsYup extends Partial<IPropertyDetailsPOST> {}
interface HeatingAndEnergyYup extends Partial<IPropertyHeatingAndEnergyPOST> {}
interface TechnicalFeaturesYup
    extends Partial<IPropertyTechnicalFeaturesPOST> {}
interface SuitableForYup extends Partial<IPropertySuitableFor> {}
interface FeaturesYup extends Partial<IPropertyFeatures> {}
interface ConstructionYup extends Partial<IPropertyConstructionPOST> {}

type OmitList =
    | "details"
    | "suitableFor"
    | "heatingAndEnergy"
    | "technicalFeatures"
    | "features"
    | "construction";

// required fields
interface IPropertyYup extends Partial<Omit<IPropertiesPOST, OmitList>> {
    code: string;
    state: string;

    details?: DetailsYup;
    suitableFor?: SuitableForYup;
    heatingAndEnergy?: HeatingAndEnergyYup;
    technicalFeatures?: TechnicalFeaturesYup;
    features?: FeaturesYup;
    construction?: ConstructionYup;
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

export const fixDropdowns = (property?: IPropertiesPOST) => ({
    category: getEnumKey(property?.category, true),
    parentCategory: getEnumKey(property?.parentCategory, true),

    details: {
        ...property?.details,

        orientation: getEnumKey(property?.details?.orientation, true),
        accessibility: getEnumKey(property?.details?.accessibility, true),
        landUse: getEnumKey(property?.details?.landUse, true),
        floor: getEnumKey(property?.details?.floor, true),
        zoneType: getEnumKey(property?.details?.zoneType, true),
        viewType: getEnumKey(property?.details?.viewType, true),
    },

    heatingAndEnergy: {
        ...property?.heatingAndEnergy,

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
        ...property?.technicalFeatures,

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

    category: getEnumKey(property?.category?.key),
    parentCategory: getEnumKey(property?.parentCategory?.key),

    title: property?.title || "",
    rented: property?.rented,

    rentalStart: property?.rentalStart || "",
    rentalEnd: property?.rentalEnd || "",
    availableAfter: property?.availableAfter || "",
    auction: property?.auction,
    exclusive: property?.exclusive,

    debatablePrice: property?.debatablePrice,
    buildable: property?.buildable,
    video: property?.video || "",
    description: property?.description || "",
    descriptionText: property?.descriptionText || "",

    suitableFor: {
        ...property?.suitableFor,
    },

    heatingAndEnergy: {
        ...property?.heatingAndEnergy,

        electricityType: getEnumKey(
            property?.heatingAndEnergy?.electricityType?.key
        ),
        heatingSystem: getEnumKey(
            property?.heatingAndEnergy?.heatingSystem?.key
        ),
        energyClass: getEnumKey(property?.heatingAndEnergy?.energyClass?.key),
        heatingType: getEnumKey(property?.heatingAndEnergy?.heatingType?.key),
    },

    distances: {
        ...property?.distances,
    },

    areas: { ...property?.areas },

    construction: {
        ...property?.construction,
    },

    technicalFeatures: {
        ...property?.technicalFeatures,

        floorType: getEnumKey(property?.technicalFeatures?.floorType?.key),
        frameType: getEnumKey(property?.technicalFeatures?.frameType?.key),
        furnished: getEnumKey(property?.technicalFeatures?.furnished?.key),
        paneGlassType: getEnumKey(
            property?.technicalFeatures?.paneGlassType?.key
        ),
        inclination: getEnumKey(property?.technicalFeatures?.inclination?.key),
    },

    details: {
        ...property?.details,

        balconies:
            property?.details?.balconies.map(({ area, side }) => ({
                area,
                side: side?.key,
            })) || [],
        parkings:
            property?.details?.parkings?.map(({ spots, parkingType }) => ({
                spots,
                parkingType: parkingType?.key,
            })) || [],

        orientation: getEnumKey(property?.details?.orientation?.key),
        accessibility: getEnumKey(property?.details?.accessibility?.key),
        landUse: getEnumKey(property?.details?.landUse?.key),
        floor: getEnumKey(property?.details?.floor?.key),
        zoneType: getEnumKey(property?.details?.zoneType?.key),
        viewType: getEnumKey(property?.details?.viewType?.key),
    },

    location: {
        street: property?.location?.street || "",
        number: property?.location?.number || "",
        complex: property?.location?.complex || "",
        city: property?.location?.city || "",
        region: property?.location?.region || "",
        country: property?.location?.country || "",
        locationDisplay:
            (property?.location?.locationDisplay?.key as LocationDisplay) ||
            LocationDisplay.NOT_VISIBLE,
        lat: property?.location?.lat,
        lng: property?.location?.lng,
    },

    features: {
        ...property?.features,
    },

    labelIDs: property?.labels
        .filter(({ id }) => id !== null) // where id not null
        .map(({ id }) => id!),
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
