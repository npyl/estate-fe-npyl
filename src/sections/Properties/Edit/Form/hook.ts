import { useMemo } from "react";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocationDisplay } from "src/types/enums";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
    codeIsUnique,
    keyCodeIsUnique,
} from "@/sections/Properties/validators";
import { DescriptionEntry, DescriptionEntryPOST } from "@/types/description";
import useFormPersist from "@/components/hook-form/useFormPersist";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";
import useFormPersistStorageKey from "@/sections/useFormPersistStorageKey";

type OmitList = "managerId" | "ownerId";

export interface IPropertyYup extends Partial<Omit<IPropertiesPOST, OmitList>> {
    code: string;
    state: string;
    managerId?: number | "";
    ownerId?: number | "";
}

const getLoginSchema = (
    initialCode: string | null,
    initialKeyCode: string | null
) =>
    Yup.object().shape({
        code: Yup.string()
            .test(
                "codeIsUnique",
                "Code already exists",
                async (value) =>
                    (await codeIsUnique(initialCode, value)) === true
            )
            .required(),
        keyCode: Yup.string().test(
            "keyCodeIsUnique",
            "Key Code already exists",
            async (value) =>
                (await keyCodeIsUnique(initialKeyCode, value)) === true
        ),
        state: Yup.string().required(),
    });

const getEnumKey = (key?: string, fix?: boolean) => key || null;

const notNot = (bool?: boolean) => !!bool;

const DEFAULT_DESCRIPTION_EL: DescriptionEntryPOST = {
    description: "",
    descriptionText: "",
    title: "",
    language: "el",
};

const DEFAULT_DESCRIPTION_EN: DescriptionEntryPOST = {
    description: "",
    descriptionText: "",
    title: "",
    language: "en",
};

const DEFAULT_DESCRIPTIONS = [DEFAULT_DESCRIPTION_EL, DEFAULT_DESCRIPTION_EN];

const getDescriptions = (
    descriptions?: Record<string, DescriptionEntry>
): DescriptionEntryPOST[] => {
    if (!descriptions) return DEFAULT_DESCRIPTIONS;

    return [
        {
            description: descriptions["el"]?.description || "",
            descriptionText: "",
            title: descriptions["el"]?.title || "",
            language: "el",
        },
        {
            description: descriptions["en"]?.description || "",
            descriptionText: "",
            title: descriptions["en"]?.title || "",
            language: "en",
        },
    ];
};

const getDefaultValues = (property?: IProperties): IPropertyYup => {
    return {
        code: property?.code || "",
        state: property?.state?.key || "",
        keyCode: property?.keyCode || "",
        descriptions: getDescriptions(property?.descriptions),
        managerId: property?.manager?.id || "",
        ownerId: property?.owner?.id || "",
        area: property?.area || undefined,
        price: property?.price || undefined,
        hidePrice: notNot(property?.hidePrice),
        plotArea: property?.plotArea || undefined,
        averageUtils: property?.averageUtils || undefined,
        estimatedRentPrice: property?.estimatedRentPrice || undefined,
        currentRentPrice: property?.currentRentPrice || undefined,
        category: getEnumKey(property?.category?.key),
        parentCategory: getEnumKey(property?.parentCategory?.key),
        rented: notNot(property?.rented),
        rentalStart: property?.rentalStart || dayjs().toISOString(),
        rentalEnd: property?.rentalEnd || dayjs().toISOString(),
        availableAfter: property?.availableAfter || dayjs().toISOString(),
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
            airConditioning: notNot(
                property?.heatingAndEnergy?.airConditioning
            ),
            floorHeating: notNot(property?.heatingAndEnergy?.floorHeating),
            offPeakElectricity: notNot(
                property?.heatingAndEnergy?.offPeakElectricity
            ),
            solarBoiler: notNot(property?.heatingAndEnergy?.solarBoiler),
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
            // ...
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
            ...property?.details,
            balconies:
                property?.details?.balconies.map(({ id, area, side }) => ({
                    id,
                    area,
                    side: side?.key,
                })) || [],
            parkings:
                property?.details?.parkings?.map(
                    ({ id, spots, parkingType }) => ({
                        id,
                        spots,
                        parkingType: parkingType?.key,
                    })
                ) || [],
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
            .filter(({ id }) => id !== null)
            .map(({ id }) => id!),
    };
};

const usePropertyForm = (
    property?: IProperties,
    onSubmitSucces: VoidFunction | null = null
) => {
    const router = useRouter();
    const { propertyId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);

    const cookieKey = useFormPersistStorageKey("PPPropertyForm", iPropertyId);

    const values = useMemo(() => getDefaultValues(property), [property]);

    const LoginSchema = getLoginSchema(
        property?.code || null,
        property?.keyCode || null
    );

    return useFormPersist<IPropertyYup>(cookieKey, onSubmitSucces, {
        resolver: yupResolver(LoginSchema),
        values,
    });
};

export default usePropertyForm;
