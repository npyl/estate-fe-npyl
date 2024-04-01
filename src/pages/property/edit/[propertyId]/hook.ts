import { useEffect, useMemo } from "react";
import { IProperties, IPropertiesPOST } from "src/types/properties";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { properties } from "src/services/properties";
import { dispatch } from "src/store";
import { LocationDisplay } from "src/types/enums";
import * as Yup from "yup";
import dayjs from "dayjs";

type OmitList = "managerId" | "ownerId";

// required fields
interface IPropertyYup extends Partial<Omit<IPropertiesPOST, OmitList>> {
    code: string;
    state: string;

    managerId?: number | "";
    ownerId?: number | "";
}

// Custom validation function
const codeIsUnique = async (initialCode: string | null, code?: string) => {
    if (!code) return true; // allow empty => we can clean the code
    if (initialCode === code) return true; // INFO: during edit initialCode and code are equal

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
const keyCodeIsUnique = async (
    initialKeyCode: string | null,
    keyCode?: string
) => {
    if (!keyCode) return true; // allow empty => we can clean the code
    if (initialKeyCode === keyCode) return true; // INFO: during edit initialCode and code are equal

    try {
        const promise = dispatch(
            properties.endpoints.checkKeyCodeExists.initiate(keyCode)
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

const getLoginSchema = (
    initialCode: string | null,
    initialKeyCode: string | null
) =>
    Yup.object().shape({
        code: Yup.string()
            .test(
                "codeIsUnique",
                "Code already exists",
                async (value) => await codeIsUnique(initialCode, value)
            )
            .required(),

        keyCode: Yup.string().test(
            "keyCodeIsUnique",
            "Key Code already exists",
            async (value) => await keyCodeIsUnique(initialKeyCode, value)
        ),

        state: Yup.string().required(),
    });

const getEnumKey = (key?: string, fix?: boolean) =>
    key || (fix ? undefined : "");
const notNot = (bool?: boolean) => !!bool;

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

const getDefaultValues = (property?: IProperties): IPropertyYup => {
    // Description EN
    const indexEN = property?.descriptions
        ? Object.keys(property?.descriptions)?.findIndex((k) => k === "en")
        : -1;
    const indexGR = property?.descriptions
        ? Object.keys(property?.descriptions)?.findIndex((k) => k === "el")
        : -1;

    const descriptionGR =
        (indexEN && property?.descriptions[indexEN]?.description) || "";
    const descriptionTextGR =
        (indexEN && property?.descriptions[indexEN]?.descriptionText) || "";
    const titleGR = (indexEN && property?.descriptions[indexEN]?.title) || "";

    // Description GR
    const descriptionEN =
        (indexGR && property?.descriptions[indexGR]?.description) || "";
    const descriptionTextEN =
        (indexGR && property?.descriptions[indexGR]?.descriptionText) || "";
    const titleEN = (indexGR && property?.descriptions[indexGR]?.title) || "";

    return {
        code: property?.code || "",
        state: property?.state?.key || "",
        keyCode: property?.keyCode || "",

        descriptions: [
            {
                description: descriptionGR,
                descriptionText: descriptionTextGR,
                title: titleGR,
                language: "el",
            },
            {
                description: descriptionEN,
                descriptionText: descriptionTextEN,
                title: titleEN,
                language: "en",
            },
        ],

        managerId: property?.manager?.id || "",
        ownerId: property?.owner?.id || "",

        area: property?.area || undefined,
        price: property?.price || undefined,
        plotArea: property?.plotArea || undefined,
        averageUtils: property?.averageUtils || undefined,
        estimatedRentPrice: property?.estimatedRentPrice || undefined,
        currentRentPrice: property?.currentRentPrice || undefined,

        category: getEnumKey(property?.category?.key),
        parentCategory: getEnumKey(property?.parentCategory?.key),

        rented: notNot(property?.rented),

        rentalStart: property?.rentalStart
            ? dayjs(property?.rentalStart).toISOString()
            : "",
        rentalEnd: property?.rentalEnd
            ? dayjs(property?.rentalEnd).toISOString()
            : "",
        availableAfter: property?.availableAfter
            ? dayjs(property.availableAfter).toISOString()
            : "",

        auction: notNot(property?.auction),
        exclusive: notNot(property?.exclusive),

        debatablePrice: notNot(property?.debatablePrice),
        buildable: notNot(property?.buildable),
        video: property?.video || "",

        suitableFor: {
            agriculturalUse: notNot(property?.suitableFor?.agriculturalUse),
            cottage: notNot(property?.suitableFor?.cottage),
            doctorsOffice: notNot(property?.suitableFor?.doctorsOffice),
            investment: notNot(property?.suitableFor?.investment),
            professionalUse: notNot(property?.suitableFor?.professionalUse),
            renovation: notNot(property?.suitableFor?.renovation),
            student: notNot(property?.suitableFor?.student),
            touristRental: notNot(property?.suitableFor?.touristRental),
        },

        heatingAndEnergy: {
            // booleans
            airConditioning: notNot(
                property?.heatingAndEnergy?.airConditioning
            ),
            floorHeating: notNot(property?.heatingAndEnergy?.floorHeating),
            offPeakElectricity: notNot(
                property?.heatingAndEnergy?.offPeakElectricity
            ),
            solarBoiler: notNot(property?.heatingAndEnergy?.solarBoiler),

            // dropdowns
            electricityType: getEnumKey(
                property?.heatingAndEnergy?.electricityType?.key
            ),
            heatingSystem: getEnumKey(
                property?.heatingAndEnergy?.heatingSystem?.key
            ),
            energyClass: getEnumKey(
                property?.heatingAndEnergy?.energyClass?.key
            ),
            heatingType: getEnumKey(
                property?.heatingAndEnergy?.heatingType?.key
            ),
        },

        distances: {
            ...property?.distances,
        },

        areas: { ...property?.areas },

        construction: {
            ...property?.construction,

            elevator: notNot(property?.construction?.elevator),
            incomplete: notNot(property?.construction?.incomplete),
            internalStairs: notNot(property?.construction?.internalStairs),
            needsRenovation: notNot(property?.construction?.needsRenovation),
            neoclassical: notNot(property?.construction?.neoclassical),
            newlyBuilt: notNot(property?.construction?.newlyBuilt),
            preserved: notNot(property?.construction?.preserved),
            renovated: notNot(property?.construction?.renovated),
            underConstruction: notNot(
                property?.construction?.underConstruction
            ),
        },

        technicalFeatures: {
            // boolean
            alarmSystem: notNot(property?.technicalFeatures?.alarmSystem),
            bright: notNot(property?.technicalFeatures?.bright),
            consideration: notNot(property?.technicalFeatures?.consideration),
            doubleFrontage: notNot(property?.technicalFeatures?.doubleFrontage),
            electricCarChargingFacilities: notNot(
                property?.technicalFeatures?.electricCarChargingFacilities
            ),
            falseCeiling: notNot(property?.technicalFeatures?.falseCeiling),
            fireplace: notNot(property?.technicalFeatures?.fireplace),
            loadingUnloadingElevator: notNot(
                property?.technicalFeatures?.loadingUnloadingElevator
            ),
            luxurious: notNot(property?.technicalFeatures?.luxurious),
            painted: notNot(property?.technicalFeatures?.painted),
            petsAllowed: notNot(property?.technicalFeatures?.petsAllowed),
            reception: notNot(property?.technicalFeatures?.reception),
            safetyDoor: notNot(property?.technicalFeatures?.safetyDoor),
            satelliteTV: notNot(property?.technicalFeatures?.satelliteTV),
            windowScreens: notNot(property?.technicalFeatures?.windowScreens),
            wiring: notNot(property?.technicalFeatures?.wiring),
            withEquipment: notNot(property?.technicalFeatures?.withEquipment),

            // numeric
            ...property?.technicalFeatures,

            // dropdowns
            floorType: getEnumKey(property?.technicalFeatures?.floorType?.key),
            frameType: getEnumKey(property?.technicalFeatures?.frameType?.key),
            furnished: getEnumKey(property?.technicalFeatures?.furnished?.key),
            paneGlassType: getEnumKey(
                property?.technicalFeatures?.paneGlassType?.key
            ),
            inclination: getEnumKey(
                property?.technicalFeatures?.inclination?.key
            ),
        },

        details: {
            // boolean
            attic: notNot(property?.details?.attic),
            electricitySupply: notNot(property?.details?.electricitySupply),
            floorApartment: notNot(property?.details?.floorApartment),
            hasBuilding: notNot(property?.details?.hasBuilding),
            hasBuildingPermit: notNot(property?.details?.hasBuildingPermit),
            irrigation: notNot(property?.details?.irrigation),
            legalAndTechnicalControl: notNot(
                property?.details?.legalAndTechnicalControl
            ),
            penthouse: notNot(property?.details?.penthouse),
            playroom: notNot(property?.details?.playroom),
            storeroom: notNot(property?.details?.storeroom),
            waterSupply: notNot(property?.details?.waterSupply),
            goldenVisa: notNot(property?.details?.goldenVisa),

            // numeric
            ...property?.details,

            // mappings
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

            // dropdowns
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
            zipCode: property?.location?.zipCode,
        },

        features: {
            panoramicView: notNot(property?.features?.panoramicView),
            seaView: notNot(property?.features?.seaView),
            mountainView: notNot(property?.features?.mountainView),
            seaFront: notNot(property?.features?.seaFront),
            walkableDistanceToBeach: notNot(
                property?.features?.walkableDistanceToBeach
            ),
            quietArea: notNot(property?.features?.quietArea),
            bright: notNot(property?.features?.bright),

            nearBusRoute: notNot(property?.features?.nearBusRoute),
            smartHome: notNot(property?.features?.smartHome),
            guestroom: notNot(property?.features?.guestroom),
            office: notNot(property?.features?.office),
            homeCinema: notNot(property?.features?.homeCinema),

            combinedKitchenAndDiningArea: notNot(
                property?.features?.combinedKitchenAndDiningArea
            ),
            soundInsulation: notNot(property?.features?.soundInsulation),
            thermalInsulation: notNot(property?.features?.thermalInsulation),
            heatedPool: notNot(property?.features?.heatedPool),
            indoorPool: notNot(property?.features?.indoorPool),
            organizedGarden: notNot(property?.features?.organizedGarden),
            jacuzzi: notNot(property?.features?.jacuzzi),
            well: notNot(property?.features?.well),

            drilling: notNot(property?.features?.drilling),
            masonryFence: notNot(property?.features?.masonryFence),
            accessForDisabled: notNot(property?.features?.accessForDisabled),
            alarmSystem: notNot(property?.features?.alarmSystem),
            has24HoursSecurity: notNot(property?.features?.has24HoursSecurity),
            cctv: notNot(property?.features?.cctv),
            internet: notNot(property?.features?.internet),
            fireDetector: notNot(property?.features?.fireDetector),

            independentHeatingPerRoom: notNot(
                property?.features?.independentHeatingPerRoom
            ),
            adaptingToTheGround: notNot(
                property?.features?.adaptingToTheGround
            ),
            barbeque: notNot(property?.features?.barbeque),
            pool: notNot(property?.features?.pool),
            view: notNot(property?.features?.view),
            facade: notNot(property?.features?.facade),

            corner: notNot(property?.features?.corner),
            veranda: notNot(property?.features?.veranda),
            tents: notNot(property?.features?.tents),
            withinResidentialZone: notNot(
                property?.features?.withinResidentialZone
            ),
            withinCityPlan: notNot(property?.features?.withinCityPlan),
            loadingDock: notNot(property?.features?.loadingDock),
        },

        labelIDs: property?.labels
            .filter(({ id }) => id !== null) // where id not null
            .map(({ id }) => id!),
    };
};

const usePropertyForm = (property?: IProperties) => {
    const defaultValues = useMemo(() => getDefaultValues(property), [property]);

    const LoginSchema = getLoginSchema(
        property?.code || null,
        property?.keyCode || null
    );

    const methods = useForm<IPropertyYup>({
        resolver: yupResolver(LoginSchema),
        values: defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { errors },
    } = methods;

    const haveError = useMemo(() => Object.keys(errors).length > 0, [errors]);

    // Scroll to top on error
    useEffect(() => {
        if (haveError) window.scrollTo(0, 0);
    }, [haveError]);

    return { methods, handleSubmit, reset };
};

export default usePropertyForm;
