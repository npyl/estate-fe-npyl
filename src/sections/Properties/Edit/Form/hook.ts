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
import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";

type OmitList = "managerId" | "ownerId";

interface Overrides {
    code: string;
    state: string;
    managerId?: number | "";
    ownerId?: number | "";
}

export type IPropertyYup = Partial<Omit<IPropertiesPOST, OmitList>> & Overrides;

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

const getEnumKey = (key?: string) => key || null;

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

// INFO: prevent undefined values (react considers them uncontrolled)
// TODO: currently, `any` is used to avoid type pollution, but it is necessary to allow non-undefined value
const getNumber = (n?: number) => (n ?? "") as any;

const getDefaultValues = (property?: IProperties): IPropertyYup => {
    const { details, construction, distances, technicalFeatures, areas } =
        property || {};

    return {
        code: property?.code || "",
        state: property?.state?.key || "",
        keyCode: property?.keyCode || "",
        descriptions: getDescriptions(property?.descriptions),
        managerId: property?.manager?.id || "",
        ownerId: property?.owner?.id || "",
        area: getNumber(property?.area),
        price: getNumber(property?.price),
        hidePrice: notNot(property?.hidePrice),
        plotArea: getNumber(property?.plotArea),
        averageUtils: getNumber(property?.averageUtils),
        estimatedRentPrice: getNumber(property?.estimatedRentPrice),
        currentRentPrice: getNumber(property?.currentRentPrice),
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
            airport: getNumber(distances?.airport),
            cafeRestaurant: getNumber(distances?.cafeRestaurant),
            entertainment: getNumber(distances?.entertainment),
            hospital: getNumber(distances?.hospital),
            publicTransport: getNumber(distances?.publicTransport),
            schools: getNumber(distances?.schools),
            sea: getNumber(distances?.sea),
            supermarket: getNumber(distances?.supermarket),
        },
        areas: {
            attic: getNumber(areas?.attic),
            balconies: getNumber(areas?.balconies),
            basement: getNumber(areas?.basement),
            covered: getNumber(areas?.covered),
            fifth: getNumber(areas?.fifth),
            first: getNumber(areas?.first),
            fourth: getNumber(areas?.fourth),
            garden: getNumber(areas?.garden),
            groundFloor: getNumber(areas?.groundFloor),
            plot: getNumber(areas?.plot),
            second: getNumber(areas?.second),
            storeroom: getNumber(areas?.storeroom),
            third: getNumber(areas?.third),
        },
        construction: {
            elevator: notNot(construction?.elevator),
            incomplete: notNot(construction?.incomplete),
            internalStairs: notNot(construction?.internalStairs),
            needsRenovation: notNot(construction?.needsRenovation),
            neoclassical: notNot(construction?.neoclassical),
            newlyBuilt: notNot(construction?.newlyBuilt),
            preserved: notNot(construction?.preserved),
            renovated: notNot(construction?.renovated),
            underConstruction: notNot(construction?.underConstruction),
            // ...
            poolSize: getNumber(construction?.poolSize),
            totalFloorNumber: getNumber(construction?.totalFloorNumber),
            yearOfConstruction: getNumber(construction?.yearOfConstruction),
            yearOfRenovation: getNumber(construction?.yearOfRenovation),
        },
        technicalFeatures: {
            coverageFactor: getNumber(technicalFeatures?.coverageFactor),
            displayWindowsLength: getNumber(
                technicalFeatures?.displayWindowsLength
            ),
            entrances: getNumber(technicalFeatures?.entrances),
            facadeLength: getNumber(technicalFeatures?.facadeLength),
            floorToAreaRatio: getNumber(technicalFeatures?.floorToAreaRatio),
            // ...
            alarmSystem: notNot(technicalFeatures?.alarmSystem),
            bright: notNot(technicalFeatures?.bright),
            consideration: notNot(technicalFeatures?.consideration),
            doubleFrontage: notNot(technicalFeatures?.doubleFrontage),
            electricCarChargingFacilities: notNot(
                technicalFeatures?.electricCarChargingFacilities
            ),
            falseCeiling: notNot(technicalFeatures?.falseCeiling),
            fireplace: notNot(technicalFeatures?.fireplace),
            loadingUnloadingElevator: notNot(
                technicalFeatures?.loadingUnloadingElevator
            ),
            luxurious: notNot(technicalFeatures?.luxurious),
            painted: notNot(technicalFeatures?.painted),
            petsAllowed: notNot(technicalFeatures?.petsAllowed),
            reception: notNot(technicalFeatures?.reception),
            safetyDoor: notNot(technicalFeatures?.safetyDoor),
            satelliteTV: notNot(technicalFeatures?.satelliteTV),
            windowScreens: notNot(technicalFeatures?.windowScreens),
            wiring: notNot(technicalFeatures?.wiring),
            withEquipment: notNot(technicalFeatures?.withEquipment),
            // ...
            floorType: getEnumKey(technicalFeatures?.floorType?.key),
            frameType: getEnumKey(technicalFeatures?.frameType?.key),
            furnished: getEnumKey(technicalFeatures?.furnished?.key),
            paneGlassType: getEnumKey(technicalFeatures?.paneGlassType?.key),
            inclination: getEnumKey(technicalFeatures?.inclination?.key),
        },
        details: {
            bedrooms: getNumber(details?.bedrooms),
            buildingBalance: getNumber(details?.buildingBalance),
            kitchens: getNumber(details?.kitchens),
            livingrooms: getNumber(details?.livingrooms),
            permissibleBuildingHeight: getNumber(
                details?.permissibleBuildingHeight
            ),
            permissibleFloors: getNumber(details?.permissibleFloors),
            plotFrontage: getNumber(details?.plotFrontage),
            setbackCoefficient: getNumber(details?.setbackCoefficient),
            totalConstruction: getNumber(details?.totalConstruction),
            layers: getNumber(details?.layers),
            wc: getNumber(details?.wc),
            bathrooms: getNumber(details?.bathrooms),
            rooms: getNumber(details?.rooms),
            frontage: getNumber(details?.frontage),
            // ...
            attic: notNot(details?.attic),
            electricitySupply: notNot(details?.electricitySupply),
            floorApartment: notNot(details?.floorApartment),
            hasBuilding: notNot(details?.hasBuilding),
            hasBuildingPermit: notNot(details?.hasBuildingPermit),
            irrigation: notNot(details?.irrigation),
            legalAndTechnicalControl: notNot(details?.legalAndTechnicalControl),
            penthouse: notNot(details?.penthouse),
            playroom: notNot(details?.playroom),
            storeroom: notNot(details?.storeroom),
            waterSupply: notNot(details?.waterSupply),
            goldenVisa: notNot(details?.goldenVisa),
            balconies:
                details?.balconies.map(({ id, area, side }) => ({
                    id,
                    area: getNumber(area),
                    side: side?.key,
                })) || [],
            parkings:
                details?.parkings?.map(({ id, spots, parkingType }) => ({
                    id,
                    spots: getNumber(spots),
                    parkingType: parkingType?.key,
                })) || [],
            orientation: getEnumKey(details?.orientation?.key),
            accessibility: getEnumKey(details?.accessibility?.key),
            landUse: getEnumKey(details?.landUse?.key),
            floor: getEnumKey(details?.floor?.key),
            zoneType: getEnumKey(details?.zoneType?.key),
            viewType: getEnumKey(details?.viewType?.key),
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
            zipCode: getNumber(property?.location?.zipCode),
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
