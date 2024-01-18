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

const LoginSchema = Yup.object().shape({
    code: Yup.string().required(),
    state: Yup.string().required(),
});

const getEnumKey = (key?: string) => key || "";

const getDefaultValues = (property?: IProperties): IPropertyYup => ({
    code: property?.code || "",
    state: property?.state?.key || "",

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
    },
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
