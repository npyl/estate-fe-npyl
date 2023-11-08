import { createSlice } from "@reduxjs/toolkit";
import { ILocation } from "src/types/location";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import type { RootState } from "../store";

interface propertyState {
    id: number; // current property id (used as key)
    properties: Record<number, IPropertiesPOST>;
}

interface InitialStatePayload {
    data: IProperties;
    id: number;
}

const initialPropertyState: IPropertiesPOST = {
    code: "",
    title: "",
    state: "",
    parentCategory: "",
    category: "",
    rented: false,

    rentalStart: "",
    rentalEnd: "",
    availableAfter: "",
    keyCode: "",
    auction: false,
    exclusive: false,

    debatablePrice: false,
    buildable: false,
    video: "",
    description: "",
    descriptionText: "",
    suitableFor: {
        student: false,
        cottage: false,
        touristRental: false,
        investment: false,
        doctorsOffice: false,
        professionalUse: false,
        renovation: false,
        agriculturalUse: false,
    },
    heatingAndEnergy: {
        // energyClass: "",
        // heatingType: "",
        // heatingSystem: "",
        // electricityType: "",
        floorHeating: false,
        airConditioning: false,
        solarBoiler: false,
        offPeakElectricity: false,
    },
    distances: {},
    areas: {},
    construction: {
        underConstruction: false,
        newlyBuilt: false,
        incomplete: false,
        internalStairs: false,
        neoclassical: false,
        renovated: false,
        needsRenovation: false,
        preserved: false,
        elevator: false,
    },
    technicalFeatures: {
        safetyDoor: false,
        alarmSystem: false,
        painted: false,
        // furnished: "",
        // frameType: "",
        // paneGlassType: "",
        windowScreens: false,
        fireplace: false,
        bright: false,
        luxurious: false,
        electricCarChargingFacilities: false,
        reception: false,
        petsAllowed: false,
        // floorType: "",
        satelliteTV: false,
        wiring: false,
        loadingUnloadingElevator: false,
        falseCeiling: false,
        withEquipment: false,
        doubleFrontage: false,
        consideration: false,
        inclination: "",
    },
    details: {
        // floor: "",
        attic: false,
        storeroom: false,
        playroom: false,
        floorApartment: false,
        penthouse: false,
        // orientation: "",
        // viewType: "",
        // accessibility: "",
        // landUse: "",
        // zoneType: "",
        balconies: [],
        parkings: [],
    },
    location: {
        street: "",
        number: "",
        complex: "",
        city: "",
        region: "",
        country: "",
    },
    features: {
        panoramicView: false,
        seaView: false,
        mountainView: false,
        seaFront: false,
        walkableDistanceToBeach: false,
        quietArea: false,
        bright: false,
        nearBusRoute: false,
        smartHome: false,
        guestroom: false,
        office: false,
        homeCinema: false,
        combinedKitchenAndDiningArea: false,
        soundInsulation: false,
        thermalInsulation: false,
        heatedPool: false,
        indoorPool: false,
        organizedGarden: false,
        jacuzzi: false,
        well: false,
        drilling: false,
        masonryFence: false,
        accessForDisabled: false,
        alarmSystem: false,
        has24HoursSecurity: false,
        cctv: false,
        internet: false,
        fireDetector: false,
        independentHeatingPerRoom: false,
        adaptingToTheGround: false,
        barbeque: false,
        pool: false,
        view: false,
        facade: false,
        corner: false,
        veranda: false,
        tents: false,
        withinResidentialZone: false,
        withinCityPlan: false,
        loadingDock: false,
    },
    labelIDs: [],
};

const initialState: propertyState = {
    id: -1,
    properties: {},
};

const slice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setCode({ id, properties }, action): void {
            properties[id].code = action.payload;
        },
        setOwner({ id, properties }, action): void {
            properties[id].ownerId = action.payload;
        },
        setRentalPeriodStart({ id, properties }, action): void {
            properties[id].rentalStart = action.payload;
        },

        setDebatablePrice({ id, properties }, action): void {
            properties[id].debatablePrice = action.payload;
        },
        setRentalPeriodEnd({ id, properties }, action): void {
            properties[id].rentalEnd = action.payload;
        },
        setParentCategory({ id, properties }, action): void {
            properties[id].parentCategory = action.payload;
        },
        setCategory({ id, properties }, action): void {
            properties[id].category = action.payload;
        },
        setManager({ id, properties }, action): void {
            properties[id].managerId = action.payload;
        },
        setState({ id, properties }, action): void {
            properties[id].state = action.payload;
        },
        setPrice({ id, properties }, action): void {
            properties[id].price = action.payload;
        },
        setRented({ id, properties }, action): void {
            properties[id].rented = action.payload;
        },

        setCurrentRentPrice({ id, properties }, action): void {
            properties[id].currentRentPrice = action.payload;
        },
        setEstimatedRentPrice({ id, properties }, action): void {
            properties[id].estimatedRentPrice = action.payload;
        },

        setCoverageFactor({ id, properties }, action): void {
            properties[id].technicalFeatures.coverageFactor = action.payload;
        },
        setKeyCode({ id, properties }, action): void {
            properties[id].keyCode = action.payload;
        },

        setBuildable({ id, properties }, action): void {
            properties[id].buildable = action.payload;
        },
        setDescription({ id, properties }, action): void {
            properties[id].description = action.payload;
        },
        setDescriptionText({ id, properties }, action): void {
            properties[id].descriptionText = action.payload;
        },

        // Location
        setStreet({ id, properties }, action): void {
            properties[id].location.street = action.payload;
        },
        setNumber({ id, properties }, action): void {
            properties[id].location.number = action.payload;
        },
        setComplex({ id, properties }, action): void {
            properties[id].location.complex = action.payload;
        },
        setCity({ id, properties }, action): void {
            properties[id].location.city = action.payload;
        },
        setZipCode({ id, properties }, action): void {
            properties[id].location.zipCode = action.payload;
        },
        setRegion({ id, properties }, action): void {
            properties[id].location.region = action.payload;
        },
        setCountry({ id, properties }, action): void {
            properties[id].location.country = action.payload;
        },
        setLatitude({ id, properties }, action): void {
            properties[id].location.lat = action.payload;
        },
        setLongitude({ id, properties }, action): void {
            properties[id].location.lng = action.payload;
        },

        setOrientation({ id, properties }, action): void {
            properties[id].details.orientation = action.payload;
        },
        setLandUse({ id, properties }, action): void {
            properties[id].details.landUse = action.payload;
        },
        setViewType({ id, properties }, action): void {
            properties[id].details.viewType = action.payload;
        },
        setAccessibility({ id, properties }, action): void {
            properties[id].details.accessibility = action.payload;
        },
        setRooms({ id, properties }, action): void {
            properties[id].details.rooms = action.payload;
        },
        setEnergyClass({ id, properties }, action): void {
            properties[id].heatingAndEnergy.energyClass = action.payload;
        },
        setOffPeakElectricity({ id, properties }, action): void {
            properties[id].heatingAndEnergy.offPeakElectricity = action.payload;
        },
        setZoneType({ id, properties }, action): void {
            properties[id].details.zoneType = action.payload;
        },
        setElectricityType({ id, properties }, action): void {
            properties[id].heatingAndEnergy.electricityType = action.payload;
        },
        setFloor({ id, properties }, action): void {
            properties[id].details.floor = action.payload;
        },
        setKitchens({ id, properties }, action): void {
            properties[id].details.kitchens = action.payload;
        },
        setLayers({ id, properties }, action): void {
            properties[id].details.layers = action.payload;
        },
        setBathrooms({ id, properties }, action): void {
            properties[id].details.bathrooms = action.payload;
        },
        setNumOfWC({ id, properties }, action): void {
            properties[id].details.wc = action.payload;
        },
        setLivingRooms({ id, properties }, action): void {
            properties[id].details.livingrooms = action.payload;
        },
        setBedrooms({ id, properties }, action): void {
            properties[id].details.bedrooms = action.payload;
        },
        setAvgUtils({ id, properties }, action): void {
            properties[id].averageUtils = action.payload;
        },

        // Areas
        setStoreroom({ id, properties }, action): void {
            properties[id].areas.storeroom = action.payload;
        },
        setCovered({ id, properties }, action): void {
            properties[id].areas.covered = action.payload;
        },
        setBasement({ id, properties }, action): void {
            properties[id].areas.basement = action.payload;
        },
        setAttic({ id, properties }, action): void {
            properties[id].areas.attic = action.payload;
        },
        setGarden({ id, properties }, action): void {
            properties[id].areas.garden = action.payload;
        },
        setArea({ id, properties }, action): void {
            properties[id].area = action.payload;
        },
        setGroundFloor({ id, properties }, action): void {
            properties[id].areas.groundFloor = action.payload;
        },
        setFirst({ id, properties }, action): void {
            properties[id].areas.first = action.payload;
        },
        setSecond({ id, properties }, action): void {
            properties[id].areas.second = action.payload;
        },
        setThird({ id, properties }, action): void {
            properties[id].areas.third = action.payload;
        },
        setFourth({ id, properties }, action): void {
            properties[id].areas.fourth = action.payload;
        },
        setFifth({ id, properties }, action): void {
            properties[id].areas.fifth = action.payload;
        },

        setPlotArea({ id, properties }, action): void {
            properties[id].plotArea = action.payload;
        },

        setStoreroomBool({ id, properties }, action): void {
            properties[id].details.storeroom = action.payload;
        },
        setHeatingType({ id, properties }, action): void {
            properties[id].heatingAndEnergy.heatingType = action.payload;
        },
        setHeatingSystem({ id, properties }, action): void {
            properties[id].heatingAndEnergy.heatingSystem = action.payload;
        },
        setFloorHeating({ id, properties }, action): void {
            properties[id].heatingAndEnergy.floorHeating = action.payload;
        },
        setAirConditioning({ id, properties }, action): void {
            properties[id].heatingAndEnergy.airConditioning = action.payload;
        },

        // Parkings & Balconies

        addParking({ id, properties }, { payload }) {
            properties[id].details.parkings.push(payload);
        },
        removeParking({ id, properties }, { payload }) {
            const indexToRemove = payload;
            if (indexToRemove === null) return;

            const newArray = [
                ...properties[id].details.parkings.slice(0, indexToRemove),
                ...properties[id].details.parkings.slice(indexToRemove + 1),
            ];

            properties[id].details.parkings = newArray;
        },
        setParkingType({ id, properties }, { payload }) {
            const index = payload.parkingIndex;
            const type = payload.type;
            if (index === null || !type) return;

            properties[id].details.parkings[index].parkingType = type;
        },
        setParkingSpots({ id, properties }, { payload }) {
            const index = payload.parkingIndex;
            const spots = payload.spots;
            if (index === null || !spots) return;

            properties[id].details.parkings[index].spots = spots;
        },
        addBalcony({ id, properties }, { payload }) {
            properties[id].details.balconies.push(payload);
        },
        removeBalcony({ id, properties }, { payload }) {
            const indexToRemove = payload;
            if (
                indexToRemove === null ||
                indexToRemove > properties[id].details.balconies.length
            )
                return;

            properties[id].details.balconies = properties[
                id
            ].details.balconies.filter((_, i) => i !== indexToRemove);
        },

        setBalconySide({ id, properties }, { payload }) {
            const index = payload.balconyIndex;
            const side = payload.side;
            if (index === null || !side) return;

            properties[id].details.balconies[index].side = side;
        },
        setBalconyArea({ id, properties }, { payload }) {
            const index = payload.balconyIndex;
            const area = payload.area;
            if (index === null || !area) return;

            properties[id].details.balconies[index].area = area;
        },

        setBalconies({ id, properties }, action) {
            properties[id].areas.balconies = action.payload;
        },
        setYearOfConstruction({ id, properties }, action): void {
            properties[id].construction.yearOfConstruction = action.payload;
        },
        setUnderConstruction({ id, properties }, action): void {
            properties[id].construction.underConstruction = action.payload;
        },
        setNewlyBuilt({ id, properties }, action): void {
            properties[id].construction.newlyBuilt = action.payload;
        },
        setIncomplete({ id, properties }, action): void {
            properties[id].construction.incomplete = action.payload;
        },
        setTotalFloorNumber({ id, properties }, action): void {
            properties[id].construction.totalFloorNumber = action.payload;
        },
        setElevator({ id, properties }, action): void {
            properties[id].construction.elevator = action.payload;
        },
        setInternalStairs({ id, properties }, action): void {
            properties[id].construction.internalStairs = action.payload;
        },
        setAvailableAfter({ id, properties }, action): void {
            properties[id].availableAfter = action.payload;
        },
        setVideo({ id, properties }, action): void {
            properties[id].video = action.payload;
        },

        setNeoclassical({ id, properties }, action): void {
            properties[id].construction.neoclassical = action.payload;
        },
        setYearOfRenovation({ id, properties }, action): void {
            properties[id].construction.yearOfRenovation = action.payload;
        },
        setRenovated({ id, properties }, action): void {
            properties[id].construction.renovated = action.payload;
        },
        setNeedsRenovation({ id, properties }, action): void {
            properties[id].construction.needsRenovation = action.payload;
        },
        setPreserved({ id, properties }, action): void {
            properties[id].construction.preserved = action.payload;
        },
        setPublicTransportation({ id, properties }, action): void {
            properties[id].distances.publicTransport = action.payload;
        },
        setSea({ id, properties }, action): void {
            properties[id].distances.sea = action.payload;
        },
        setSchools({ id, properties }, action): void {
            properties[id].distances.schools = action.payload;
        },
        setSupermarket({ id, properties }, action): void {
            properties[id].distances.supermarket = action.payload;
        },
        setCafeRestaurant({ id, properties }, action): void {
            properties[id].distances.cafeRestaurant = action.payload;
        },
        setHospital({ id, properties }, action): void {
            properties[id].distances.hospital = action.payload;
        },
        setAirport({ id, properties }, action): void {
            properties[id].distances.airport = action.payload;
        },
        setPool({ id, properties }, action): void {
            properties[id].features.pool = action.payload;
        },

        setAccessForDisable({ id, properties }, action): void {
            properties[id].features.accessForDisabled = action.payload;
        },

        setSolarBoiler({ id, properties }, action): void {
            properties[id].heatingAndEnergy.solarBoiler = action.payload;
        },

        setOffice({ id, properties }, action): void {
            properties[id].features.office = action.payload;
        },

        setInternet({ id, properties }, action): void {
            properties[id].features.internet = action.payload;
        },

        setThermalInsulation({ id, properties }, action): void {
            properties[id].features.thermalInsulation = action.payload;
        },

        setSeaView({ id, properties }, action): void {
            properties[id].features.seaView = action.payload;
        },

        setGuestroom({ id, properties }, action): void {
            properties[id].features.guestroom = action.payload;
        },

        setQuietArea({ id, properties }, action): void {
            properties[id].features.quietArea = action.payload;
        },

        setSoundInsulation({ id, properties }, action): void {
            properties[id].features.soundInsulation = action.payload;
        },

        setHas24HoursSecurity({ id, properties }, action): void {
            properties[id].features.has24HoursSecurity = action.payload;
        },

        setHasAttic({ id, properties }, action): void {
            properties[id].details.attic = action.payload;
        },

        setBarbeque({ id, properties }, action): void {
            properties[id].features.barbeque = action.payload;
        },

        setCctv({ id, properties }, action): void {
            properties[id].features.cctv = action.payload;
        },

        setCombinedKitchenAndDiningArea({ id, properties }, action): void {
            properties[id].features.combinedKitchenAndDiningArea =
                action.payload;
        },

        setFireDetector({ id, properties }, action): void {
            properties[id].features.fireDetector = action.payload;
        },

        setHomeCinema({ id, properties }, action): void {
            properties[id].features.homeCinema = action.payload;
        },
        setJacuzzi({ id, properties }, action): void {
            properties[id].features.jacuzzi = action.payload;
        },

        setNearBusRoute({ id, properties }, action): void {
            properties[id].features.nearBusRoute = action.payload;
        },

        setPanoramicView({ id, properties }, action): void {
            properties[id].features.panoramicView = action.payload;
        },

        setPlayRoom({ id, properties }, action): void {
            properties[id].details.playroom = action.payload;
        },

        setSmartHome({ id, properties }, action): void {
            properties[id].features.smartHome = action.payload;
        },

        setMountainView({ id, properties }, action): void {
            properties[id].features.mountainView = action.payload;
        },

        setSeaFront({ id, properties }, action): void {
            properties[id].features.seaFront = action.payload;
        },

        setHeatedPool({ id, properties }, action): void {
            properties[id].features.heatedPool = action.payload;
        },

        setIndoorPool({ id, properties }, action): void {
            properties[id].features.indoorPool = action.payload;
        },

        setOrganizedGarden({ id, properties }, action): void {
            properties[id].features.organizedGarden = action.payload;
        },

        setWell({ id, properties }, action): void {
            properties[id].features.well = action.payload;
        },

        setDrilling({ id, properties }, action): void {
            properties[id].features.drilling = action.payload;
        },

        setMasonryFence({ id, properties }, action): void {
            properties[id].features.masonryFence = action.payload;
        },

        setAccessForDisabled({ id, properties }, action): void {
            properties[id].features.accessForDisabled = action.payload;
        },

        setIndependentHeatingPerRoom({ id, properties }, action): void {
            properties[id].features.independentHeatingPerRoom = action.payload;
        },

        setAdaptingToTheGround({ id, properties }, action): void {
            properties[id].features.adaptingToTheGround = action.payload;
        },

        setView({ id, properties }, action): void {
            properties[id].features.view = action.payload;
        },

        setFacade({ id, properties }, action): void {
            properties[id].features.facade = action.payload;
        },
        setLoadingDock({ id, properties }, action): void {
            properties[id].features.loadingDock = action.payload;
        },

        setCorner({ id, properties }, action): void {
            properties[id].features.corner = action.payload;
        },

        setVeranda({ id, properties }, action): void {
            properties[id].features.veranda = action.payload;
        },

        setTents({ id, properties }, action): void {
            properties[id].features.tents = action.payload;
        },

        setWithinResidentialZone({ id, properties }, action): void {
            properties[id].features.withinResidentialZone = action.payload;
        },

        setWithinCityPlan({ id, properties }, action): void {
            properties[id].features.withinCityPlan = action.payload;
        },

        setWalkableDistanceToBeach({ id, properties }, action): void {
            properties[id].features.walkableDistanceToBeach = action.payload;
        },

        setFloorApartment({ id, properties }, action): void {
            properties[id].details.floorApartment = action.payload;
        },
        setPenthouse({ id, properties }, action): void {
            properties[id].details.penthouse = action.payload;
        },
        setEntrances({ id, properties }, action): void {
            properties[id].technicalFeatures.entrances = action.payload;
        },

        setDisplayWindowsLength({ id, properties }, action): void {
            properties[id].technicalFeatures.displayWindowsLength =
                action.payload;
        },

        setSafetyDoor({ id, properties }, action): void {
            properties[id].technicalFeatures.safetyDoor = action.payload;
        },

        setAlarmSystem({ id, properties }, action): void {
            properties[id].technicalFeatures.alarmSystem = action.payload;
        },

        setPainted({ id, properties }, action): void {
            properties[id].technicalFeatures.painted = action.payload;
        },

        setFurnished({ id, properties }, action): void {
            properties[id].technicalFeatures.furnished = action.payload;
        },

        setFrameType({ id, properties }, action): void {
            properties[id].technicalFeatures.frameType = action.payload;
        },

        setPaneGlassType({ id, properties }, action): void {
            properties[id].technicalFeatures.paneGlassType = action.payload;
        },

        setWindowScreens({ id, properties }, action): void {
            properties[id].technicalFeatures.windowScreens = action.payload;
        },

        setFireplace({ id, properties }, action): void {
            properties[id].technicalFeatures.fireplace = action.payload;
        },

        setBright({ id, properties }, action): void {
            properties[id].technicalFeatures.bright = action.payload;
        },

        setLuxurious({ id, properties }, action): void {
            properties[id].technicalFeatures.luxurious = action.payload;
        },

        setElectricCarChargingFacilities({ id, properties }, action): void {
            properties[id].technicalFeatures.electricCarChargingFacilities =
                action.payload;
        },

        setReception({ id, properties }, action): void {
            properties[id].technicalFeatures.reception = action.payload;
        },

        setPetsAllowed({ id, properties }, action): void {
            properties[id].technicalFeatures.petsAllowed = action.payload;
        },

        setFloorType({ id, properties }, action): void {
            properties[id].technicalFeatures.floorType = action.payload;
        },

        setSatelliteTV({ id, properties }, action): void {
            properties[id].technicalFeatures.satelliteTV = action.payload;
        },

        setWiring({ id, properties }, action): void {
            properties[id].technicalFeatures.wiring = action.payload;
        },

        setLoadingUnloadingElevator({ id, properties }, action): void {
            properties[id].technicalFeatures.loadingUnloadingElevator =
                action.payload;
        },

        setFalseCeiling({ id, properties }, action): void {
            properties[id].technicalFeatures.falseCeiling = action.payload;
        },

        setWithEquipment({ id, properties }, action): void {
            properties[id].technicalFeatures.withEquipment = action.payload;
        },

        setDoubleFrontage({ id, properties }, action): void {
            properties[id].technicalFeatures.doubleFrontage = action.payload;
        },

        setConsideration({ id, properties }, action): void {
            properties[id].technicalFeatures.consideration = action.payload;
        },

        setFloorToAreaRatio({ id, properties }, action): void {
            properties[id].technicalFeatures.floorToAreaRatio = action.payload;
        },
        setFacadeLength({ id, properties }, action): void {
            properties[id].technicalFeatures.facadeLength = action.payload;
        },

        setInclination({ id, properties }, action): void {
            properties[id].technicalFeatures.inclination = action.payload;
        },

        setStudent({ id, properties }, action): void {
            properties[id].suitableFor.student = action.payload;
        },
        setAgriculturalUse({ id, properties }, action): void {
            properties[id].suitableFor.agriculturalUse = action.payload;
        },
        setCottage({ id, properties }, action): void {
            properties[id].suitableFor.cottage = action.payload;
        },

        setAuction({ id, properties }, action): void {
            properties[id].auction = action.payload;
        },
        setExclusive({ id, properties }, action): void {
            properties[id].exclusive = action.payload;
        },

        setTouristRental({ id, properties }, action): void {
            properties[id].suitableFor.touristRental = action.payload;
        },
        setInvestment({ id, properties }, action): void {
            properties[id].suitableFor.investment = action.payload;
        },
        setDoctorsOffice({ id, properties }, action): void {
            properties[id].suitableFor.doctorsOffice = action.payload;
        },
        setProfessionalUse({ id, properties }, action): void {
            properties[id].suitableFor.professionalUse = action.payload;
        },
        setRenovation({ id, properties }, action): void {
            properties[id].suitableFor.renovation = action.payload;
        },

        addLabel({ id, properties }, action): void {
            if (!properties[id].labelIDs.includes(action.payload))
                properties[id].labelIDs.push(action.payload);
        },
        removeLabel({ id, properties }, { payload }): void {
            // INFO: removes based on array index (contrary to addLabel)
            const index = payload;
            properties[id].labelIDs = properties[id].labelIDs.filter(
                (_, i) => i !== index
            );
        },

        setInitialState: (state, action): void => {
            const { properties } = state;
            const payload: InitialStatePayload = action.payload;
            const { data, id } = payload;
            const { details, heatingAndEnergy, technicalFeatures } = data;

            // Change current id
            state.id = id;

            if (id in properties) return;

            properties[id] = { ...initialPropertyState };

            // INFO: we don't get a valid value, use the one on the initialState which is non-null but always means "unset";
            //        this way we prevent nulls and at the same time show the values as empty

            properties[id].code = data.code || initialPropertyState.code;
            properties[id].title = data.title || initialPropertyState.title;
            properties[id].managerId =
                data.manager?.id || initialPropertyState.managerId;
            properties[id].ownerId =
                data.owner?.id || initialPropertyState.ownerId;

            // (1)
            properties[id] = {
                ...properties[id],
                state: data.state?.key || initialPropertyState.state,
            };
            // (1)
            properties[id] = {
                ...properties[id],
                parentCategory:
                    data.parentCategory?.key ||
                    initialPropertyState.parentCategory,
            };
            // (1)
            properties[id] = {
                ...properties[id],
                category: data.category?.key || initialPropertyState.category,
            };

            properties[id].area = data.area || initialPropertyState.area;
            properties[id].plotArea =
                data.plotArea || initialPropertyState.plotArea;
            properties[id].price = data.price || initialPropertyState.price;
            properties[id].averageUtils =
                data.averageUtils || initialPropertyState.averageUtils;
            properties[id].rented = data.rented || initialPropertyState.rented;

            properties[id].currentRentPrice =
                data.currentRentPrice || initialPropertyState.currentRentPrice;
            properties[id].estimatedRentPrice =
                data.estimatedRentPrice ||
                initialPropertyState.estimatedRentPrice;
            properties[id].rentalStart =
                data.rentalStart || initialPropertyState.rentalStart;
            properties[id].rentalEnd =
                data.rentalEnd || initialPropertyState.rentalEnd;
            properties[id].availableAfter =
                data.availableAfter || initialPropertyState.availableAfter;
            properties[id].keyCode =
                data.keyCode || initialPropertyState.keyCode;

            properties[id].auction =
                data.auction || initialPropertyState.auction;
            properties[id].exclusive =
                data.exclusive || initialPropertyState.exclusive;

            properties[id].debatablePrice =
                data.debatablePrice || initialPropertyState.debatablePrice;
            properties[id].buildable =
                data.buildable || initialPropertyState.buildable;
            properties[id].video = data.video || initialPropertyState.video;
            properties[id].description =
                data.description || initialPropertyState.description;
            properties[id].descriptionText =
                data.descriptionText || initialPropertyState.descriptionText;

            // Details
            // (1)
            properties[id].details = {
                ...properties[id].details,
                floor:
                    details?.floor?.key || initialPropertyState.details.floor,
            };

            properties[id].details.bedrooms =
                details?.bedrooms || initialPropertyState.details.bedrooms;
            properties[id].details.kitchens =
                details?.kitchens || initialPropertyState.details.kitchens;
            properties[id].details.wc =
                details?.wc || initialPropertyState.details.wc;
            properties[id].details.layers =
                details?.layers || initialPropertyState.details.layers;
            properties[id].details.livingrooms =
                details?.livingrooms ||
                initialPropertyState.details.livingrooms;
            properties[id].details.bathrooms =
                details?.bathrooms || initialPropertyState.details.bathrooms;
            properties[id].details.rooms =
                details?.rooms || initialPropertyState.details.rooms;
            properties[id].details.attic =
                details?.attic || initialPropertyState.details.attic;
            properties[id].details.storeroom =
                details?.storeroom || initialPropertyState.details.storeroom;
            properties[id].details.playroom =
                details?.playroom || initialPropertyState.details.playroom;
            properties[id].details.floorApartment =
                details?.floorApartment ||
                initialPropertyState.details.floorApartment;
            properties[id].details.penthouse =
                details?.penthouse || initialPropertyState.details.penthouse;

            // (1)
            properties[id].details = {
                ...properties[id].details,
                orientation:
                    details?.orientation?.key ||
                    initialPropertyState.details.orientation,
            };
            // (1)
            properties[id].details = {
                ...properties[id].details,
                viewType:
                    details?.viewType?.key ||
                    initialPropertyState.details.viewType,
            };
            // (1)
            properties[id].details = {
                ...properties[id].details,
                accessibility:
                    details?.accessibility?.key ||
                    initialPropertyState.details.accessibility,
            };
            // (1)
            properties[id].details = {
                ...properties[id].details,
                landUse:
                    details?.landUse?.key ||
                    initialPropertyState.details.landUse,
            };
            // (1)
            properties[id].details = {
                ...properties[id].details,
                zoneType:
                    details?.zoneType?.key ||
                    initialPropertyState.details.zoneType,
            };

            // TODO?:
            properties[id].details.parkings =
                details?.parkings.map((parking) => ({
                    spots: parking.spots,
                    parkingType: parking.parkingType?.key,
                })) || initialPropertyState.details.parkings;
            properties[id].details.balconies =
                details?.balconies.map((balcony) => ({
                    area: balcony.area,
                    side: balcony.side?.key,
                })) || initialPropertyState.details.balconies;

            // Heating & Energy
            // (1)
            properties[id].heatingAndEnergy = {
                ...properties[id].heatingAndEnergy,
                energyClass:
                    heatingAndEnergy?.energyClass?.key ||
                    initialPropertyState.heatingAndEnergy.energyClass,
            };
            // (1)
            properties[id].heatingAndEnergy = {
                ...properties[id].heatingAndEnergy,
                heatingType:
                    heatingAndEnergy?.heatingType?.key ||
                    initialPropertyState.heatingAndEnergy.heatingType,
            };
            // (1)
            properties[id].heatingAndEnergy = {
                ...properties[id].heatingAndEnergy,
                heatingSystem:
                    heatingAndEnergy?.heatingSystem?.key ||
                    initialPropertyState.heatingAndEnergy.heatingSystem,
            };
            // (1)
            properties[id].heatingAndEnergy = {
                ...properties[id].heatingAndEnergy,
                electricityType:
                    heatingAndEnergy?.electricityType?.key ||
                    initialPropertyState.heatingAndEnergy.electricityType,
            };

            properties[id].heatingAndEnergy.floorHeating =
                heatingAndEnergy?.floorHeating ||
                initialPropertyState.heatingAndEnergy.floorHeating;
            properties[id].heatingAndEnergy.airConditioning =
                heatingAndEnergy?.airConditioning ||
                initialPropertyState.heatingAndEnergy.airConditioning;
            properties[id].heatingAndEnergy.solarBoiler =
                heatingAndEnergy?.solarBoiler ||
                initialPropertyState.heatingAndEnergy.solarBoiler;
            properties[id].heatingAndEnergy.offPeakElectricity =
                heatingAndEnergy?.offPeakElectricity ||
                initialPropertyState.heatingAndEnergy.offPeakElectricity;

            // Suitable For
            properties[id].suitableFor =
                data.suitableFor || initialPropertyState.suitableFor;
            // Distances
            properties[id].distances =
                data.distances || initialPropertyState.distances;
            // Construction
            properties[id].construction =
                data.construction || initialPropertyState.construction;
            // Features
            properties[id].features =
                data.features || initialPropertyState.features;

            // Technical Features
            properties[id].technicalFeatures.entrances =
                technicalFeatures?.entrances ||
                initialPropertyState.technicalFeatures.entrances;
            properties[id].technicalFeatures.displayWindowsLength =
                technicalFeatures?.displayWindowsLength ||
                initialPropertyState.technicalFeatures.displayWindowsLength;
            properties[id].technicalFeatures.safetyDoor =
                technicalFeatures?.safetyDoor ||
                initialPropertyState.technicalFeatures.safetyDoor;
            properties[id].technicalFeatures.alarmSystem =
                technicalFeatures?.alarmSystem ||
                initialPropertyState.technicalFeatures.alarmSystem;
            properties[id].technicalFeatures.painted =
                technicalFeatures?.painted ||
                initialPropertyState.technicalFeatures.painted;
            // (1)
            properties[id].technicalFeatures = {
                ...properties[id].technicalFeatures,
                furnished:
                    technicalFeatures?.furnished?.key ||
                    initialPropertyState.technicalFeatures.furnished,
            };
            // (1)
            properties[id].technicalFeatures = {
                ...properties[id].technicalFeatures,
                frameType:
                    technicalFeatures?.frameType?.key ||
                    initialPropertyState.technicalFeatures.frameType,
            };
            // (1)
            properties[id].technicalFeatures = {
                ...properties[id].technicalFeatures,
                paneGlassType:
                    technicalFeatures?.paneGlassType?.key ||
                    initialPropertyState.technicalFeatures.paneGlassType,
            };
            properties[id].technicalFeatures.windowScreens =
                technicalFeatures?.windowScreens ||
                initialPropertyState.technicalFeatures.windowScreens;
            properties[id].technicalFeatures.fireplace =
                technicalFeatures?.fireplace ||
                initialPropertyState.technicalFeatures.fireplace;
            properties[id].technicalFeatures.bright =
                technicalFeatures?.bright ||
                initialPropertyState.technicalFeatures.bright;
            properties[id].technicalFeatures.luxurious =
                technicalFeatures?.luxurious ||
                initialPropertyState.technicalFeatures.luxurious;
            properties[id].technicalFeatures.electricCarChargingFacilities =
                technicalFeatures?.electricCarChargingFacilities ||
                initialPropertyState.technicalFeatures
                    .electricCarChargingFacilities;
            properties[id].technicalFeatures.reception =
                technicalFeatures?.reception ||
                initialPropertyState.technicalFeatures.reception;
            properties[id].technicalFeatures.petsAllowed =
                technicalFeatures?.petsAllowed ||
                initialPropertyState.technicalFeatures.petsAllowed;
            // (1)
            properties[id].technicalFeatures = {
                ...properties[id].technicalFeatures,
                floorType:
                    technicalFeatures?.floorType?.key ||
                    initialPropertyState.technicalFeatures.floorType,
            };
            properties[id].technicalFeatures.satelliteTV =
                technicalFeatures?.satelliteTV ||
                initialPropertyState.technicalFeatures.satelliteTV;
            properties[id].technicalFeatures.wiring =
                technicalFeatures?.wiring ||
                initialPropertyState.technicalFeatures.wiring;
            properties[id].technicalFeatures.loadingUnloadingElevator =
                technicalFeatures?.loadingUnloadingElevator ||
                initialPropertyState.technicalFeatures.loadingUnloadingElevator;
            properties[id].technicalFeatures.falseCeiling =
                technicalFeatures?.falseCeiling ||
                initialPropertyState.technicalFeatures.falseCeiling;
            properties[id].technicalFeatures.withEquipment =
                technicalFeatures?.withEquipment ||
                initialPropertyState.technicalFeatures.withEquipment;
            properties[id].technicalFeatures.doubleFrontage =
                technicalFeatures?.doubleFrontage ||
                initialPropertyState.technicalFeatures.doubleFrontage;
            properties[id].technicalFeatures.consideration =
                technicalFeatures?.consideration ||
                initialPropertyState.technicalFeatures.consideration;
            properties[id].technicalFeatures.floorToAreaRatio =
                technicalFeatures?.floorToAreaRatio ||
                initialPropertyState.technicalFeatures.floorToAreaRatio;
            properties[id].technicalFeatures.coverageFactor =
                technicalFeatures?.coverageFactor ||
                initialPropertyState.technicalFeatures.coverageFactor;
            properties[id].technicalFeatures.facadeLength =
                technicalFeatures?.facadeLength ||
                initialPropertyState.technicalFeatures.facadeLength;
            // (1)
            properties[id].technicalFeatures = {
                ...properties[id].technicalFeatures,
                inclination:
                    technicalFeatures?.inclination?.key ||
                    initialPropertyState.technicalFeatures.inclination,
            };

            // areas
            properties[id].areas = data.areas || initialPropertyState.areas;

            // Location (convert from ILocationPOST to ILocation)
            const location: ILocation = data.location;

            properties[id].location = {
                city: location?.city || initialPropertyState.location.city,
                country:
                    location?.country || initialPropertyState.location.country,
                number:
                    location?.number || initialPropertyState.location.number,
                region:
                    location?.region || initialPropertyState.location.region,
                street:
                    location?.street || initialPropertyState.location.street,
                zipCode:
                    location?.zipCode || initialPropertyState.location.zipCode,
                complex:
                    location?.complex || initialPropertyState.location.complex,
                lat: location?.lat || initialPropertyState.location.lat,
                lng: location?.lng || initialPropertyState.location.lng,
            };

            // map labels
            properties[id].labelIDs = data.labels
                ? data.labels
                      .filter((label) => label.id) // where id not null
                      .map((label) => {
                          return label.id!;
                      })
                : [];
        },
        resetState: () => {
            return initialState;
        },
    },
});

export const {
    setInitialState,

    setKeyCode,

    setVideo,
    setCoverageFactor,
    setSeaFront,
    setAgriculturalUse,
    setHeatedPool,
    setIndoorPool,
    setOrganizedGarden,
    setWell,
    setDrilling,
    setMasonryFence,
    setAccessForDisabled,
    setIndependentHeatingPerRoom,
    setAdaptingToTheGround,
    setView,
    setFacade,
    setCorner,
    setVeranda,
    setTents,
    setWithinResidentialZone,
    setWithinCityPlan,
    setMountainView,
    setStudent,
    setCottage,
    setTouristRental,
    setInvestment,
    setDoctorsOffice,
    setProfessionalUse,
    setRenovation,
    setDisplayWindowsLength,
    setSafetyDoor,
    setAlarmSystem,
    setPainted,
    setFurnished,
    setFrameType,
    setPaneGlassType,
    setWindowScreens,
    setFireplace,
    setBright,
    setLuxurious,
    setElectricCarChargingFacilities,
    setReception,
    setPetsAllowed,
    setFloorType,
    setSatelliteTV,
    setWiring,
    setLoadingUnloadingElevator,
    setFalseCeiling,
    setWithEquipment,
    setDoubleFrontage,
    setConsideration,
    setFloorToAreaRatio,
    setFacadeLength,
    setInclination,
    setYearOfConstruction,
    setUnderConstruction,
    setNewlyBuilt,
    setIncomplete,
    setTotalFloorNumber,
    setAvailableAfter,
    setInternalStairs,
    setNeoclassical,
    setYearOfRenovation,
    setRenovated,
    setNeedsRenovation,
    setPreserved,
    setSea,
    setLoadingDock,
    setSchools,
    setSupermarket,
    setCafeRestaurant,
    setHospital,
    setAirport,
    setCode,
    setOffPeakElectricity,
    setAuction,
    setExclusive,
    setDebatablePrice,
    setFloorApartment,
    setPenthouse,
    setLandUse,
    setCurrentRentPrice,
    setEstimatedRentPrice,
    setParentCategory,
    setOwner,
    setRentalPeriodStart,
    setRentalPeriodEnd,
    setManager,
    setCategory,
    setState,
    setPrice,
    setRented,

    // ROI

    // Areas
    setArea,
    setPlotArea,
    setBalconies,
    setBasement,
    setAttic,
    setGarden,
    setGroundFloor,
    setFirst,
    setSecond,
    setThird,
    setFourth,
    setFifth,

    // Location
    setStreet,
    setNumber,
    setCity,
    setZipCode,
    setComplex,
    setRegion,
    setCountry,
    setDescription,
    setDescriptionText,
    setLatitude,
    setLongitude,

    setOrientation,
    setViewType,
    setAccessibility,
    setEnergyClass,
    setZoneType,
    setElectricityType,
    setFloor,
    setKitchens,
    setLayers,
    setBathrooms,
    setNumOfWC,
    setLivingRooms,
    setBedrooms,
    setStoreroom,
    setStoreroomBool,
    setCovered,
    setAvgUtils,
    setHeatingType,
    setHeatingSystem,
    setFloorHeating,
    setAirConditioning,

    // Parkings & Balconies
    addParking,
    removeParking,
    setParkingType,
    setParkingSpots,
    addBalcony,
    removeBalcony,
    setBalconySide,
    setBalconyArea,

    setPublicTransportation,
    setRooms,
    setHasAttic,
    setPool,
    setAccessForDisable,
    setSolarBoiler,
    setOffice,
    setInternet,
    setEntrances,
    setThermalInsulation,
    setSeaView,
    setGuestroom,
    setQuietArea,
    setSoundInsulation,
    setHas24HoursSecurity,
    setBuildable,
    setBarbeque,
    setCctv,
    setCombinedKitchenAndDiningArea,
    setFireDetector,
    setHomeCinema,
    setJacuzzi,
    setNearBusRoute,
    setPanoramicView,
    setPlayRoom,
    setSmartHome,
    setWalkableDistanceToBeach,
    setElevator,

    addLabel,
    removeLabel,

    resetState,
} = slice.actions;

export const selectAll = ({
    property: { id, properties },
}: RootState): IPropertiesPOST | undefined => properties[id];

export const selectCode = ({ property: { id, properties } }: RootState) =>
    properties[id]?.code;
export const selectRentalPeriodStart = ({
    property: { id, properties },
}: RootState) => properties[id]?.rentalStart;
export const selectRentalPeriodEnd = ({
    property: { id, properties },
}: RootState) => properties[id]?.rentalEnd;

export const selectOwner = ({ property: { id, properties } }: RootState) =>
    properties[id]?.ownerId;
export const selectManager = ({ property: { id, properties } }: RootState) =>
    properties[id]?.managerId;
export const selectCategory = ({ property: { id, properties } }: RootState) =>
    properties[id]?.category;
export const selectState = ({ property: { id, properties } }: RootState) =>
    properties[id]?.state;
export const selectCurrentRentPrice = ({
    property: { id, properties },
}: RootState) => properties[id]?.currentRentPrice;
export const selectEstimatedRentPrice = ({
    property: { id, properties },
}: RootState) => properties[id]?.estimatedRentPrice;

export const selectAuction = ({ property: { id, properties } }: RootState) =>
    properties[id]?.auction;
export const selectExclusive = ({ property: { id, properties } }: RootState) =>
    properties[id]?.exclusive;

export const selectDebatablePrice = ({
    property: { id, properties },
}: RootState) => properties[id]?.debatablePrice;
export const selectPrice = ({ property: { id, properties } }: RootState) =>
    properties[id]?.price;
export const selectArea = ({ property: { id, properties } }: RootState) =>
    properties[id]?.area;
export const selectPlotArea = ({ property: { id, properties } }: RootState) =>
    properties[id]?.plotArea;
export const selectParentCategory = ({
    property: { id, properties },
}: RootState) => properties[id]?.parentCategory;
export const selectAvgUtils = ({ property: { id, properties } }: RootState) =>
    properties[id]?.averageUtils;
export const selectKeyCode = ({ property: { id, properties } }: RootState) =>
    properties[id]?.keyCode;
export const selectBuildable = ({ property: { id, properties } }: RootState) =>
    properties[id]?.buildable;
export const selectDescription = ({
    property: { id, properties },
}: RootState) => properties[id]?.description;
export const selectDescriptionText = ({
    property: { id, properties },
}: RootState) => properties[id]?.descriptionText;
export const selectAvailableAfter = ({
    property: { id, properties },
}: RootState) => properties[id]?.availableAfter;
export const selectVideo = ({ property: { id, properties } }: RootState) =>
    properties[id]?.video;
export const selectRented = ({ property: { id, properties } }: RootState) =>
    properties[id]?.rented;

// Location
export const selectStreet = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.street;
export const selectNumber = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.number;
export const selectComplex = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.complex;
export const selectCity = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.city;
export const selectZipCode = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.zipCode;
export const selectRegion = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.region;
export const selectCountry = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.country;
export const selectLatitude = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.lat;
export const selectLongitude = ({ property: { id, properties } }: RootState) =>
    properties[id]?.location?.lng;

// Details
export const selectOrientation = ({
    property: { id, properties },
}: RootState) => properties[id]?.details?.orientation;
export const selectLandUse = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.landUse;
export const selectViewType = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.viewType;
export const selectAccessibility = ({
    property: { id, properties },
}: RootState) => properties[id]?.details?.accessibility;
export const selectFloor = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.floor;
export const selectKitchens = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.kitchens;
export const selectLayers = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.layers;
export const selectBathrooms = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.bathrooms;
export const selectNumOfWC = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.wc;
export const selectLivingRooms = ({
    property: { id, properties },
}: RootState) => properties[id]?.details?.livingrooms;
export const selectBedrooms = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.bedrooms;
export const selectStoreroomBool = ({
    property: { id, properties },
}: RootState) => properties[id]?.details?.storeroom;
export const selectRooms = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.rooms;

// Heating
export const selectElectricityType = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.electricityType;
export const selectSolarBoiler = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.solarBoiler;
export const selectEnergyClass = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.energyClass;
export const selectOffPeakElectricity = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.offPeakElectricity;
export const selectZoneType = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.zoneType;
export const selectHeatingSystem = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.heatingSystem;
export const selectHeatingType = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.heatingType;
export const selectFloorHeating = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.floorHeating;
export const selectAirConditioning = ({
    property: { id, properties },
}: RootState) => properties[id]?.heatingAndEnergy?.airConditioning;

// Suitable For
export const selectStudent = ({ property: { id, properties } }: RootState) =>
    properties[id]?.suitableFor?.student;
export const selectCottage = ({ property: { id, properties } }: RootState) =>
    properties[id]?.suitableFor?.cottage;
export const selectTouristRental = ({
    property: { id, properties },
}: RootState) => properties[id]?.suitableFor?.touristRental;
export const selectInvestment = ({ property: { id, properties } }: RootState) =>
    properties[id]?.suitableFor?.investment;
export const selectDoctorsOffice = ({
    property: { id, properties },
}: RootState) => properties[id]?.suitableFor?.doctorsOffice;
export const selectProfessionalUse = ({
    property: { id, properties },
}: RootState) => properties[id]?.suitableFor?.professionalUse;
export const selectRenovation = ({ property: { id, properties } }: RootState) =>
    properties[id]?.suitableFor?.renovation;
export const selectAgriculturalUse = ({
    property: { id, properties },
}: RootState) => properties[id]?.suitableFor?.agriculturalUse;

// Technical Features
export const selectDisplayWindowsLength = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.displayWindowsLength;

export const selectSafetyDoor = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.safetyDoor;

export const selectAlarmSystem = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.alarmSystem;

export const selectPainted = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.painted;

export const selectFurnished = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.furnished;

export const selectFrameType = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.frameType;

export const selectPaneGlassType = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.paneGlassType;

export const selectWindowScreens = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.windowScreens;

export const selectFireplace = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.fireplace;

export const selectBright = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.bright;

export const selectLuxurious = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.luxurious;

export const selectElectricCarChargingFacilities = ({
    property: { id, properties },
}: RootState) =>
    properties[id]?.technicalFeatures?.electricCarChargingFacilities;

export const selectReception = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.reception;

export const selectPetsAllowed = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.petsAllowed;

export const selectFloorType = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.floorType;

export const selectSatelliteTV = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.satelliteTV;

export const selectWiring = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.wiring;

export const selectLoadingUnloadingElevator = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.loadingUnloadingElevator;

export const selectFalseCeiling = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.falseCeiling;

export const selectWithEquipment = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.withEquipment;

export const selectDoubleFrontage = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.doubleFrontage;

export const selectConsideration = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.consideration;

export const selectFloorToAreaRatio = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.floorToAreaRatio;

export const selectCoverageFactor = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.coverageFactor;

export const selectFacadeLength = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.facadeLength;

export const selectInclination = ({
    property: { id, properties },
}: RootState) => properties[id]?.technicalFeatures?.inclination;

export const selectEntrances = ({ property: { id, properties } }: RootState) =>
    properties[id]?.technicalFeatures?.entrances;

// Areas
export const selectBalconiesArea = ({
    property: { id, properties },
}: RootState) => properties[id]?.areas?.balconies;
export const selectCovered = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.covered;
export const selectBasement = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.basement;
export const selectGarden = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.garden;
export const selectStoreroom = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.storeroom;
export const selectAttic = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.attic;
export const selectGroundFloor = ({
    property: { id, properties },
}: RootState) => properties[id]?.areas?.groundFloor;
export const selectFirst = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.first;
export const selectSecond = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.second;
export const selectThird = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.third;
export const selectFourth = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.fourth;
export const selectFifth = ({ property: { id, properties } }: RootState) =>
    properties[id]?.areas?.fifth;

// Parkings & Balconies
export const selectParkings = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.parkings;
export const selectBalconies = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.balconies;

// Distances
export const selectPublicTransportation = ({
    property: { id, properties },
}: RootState) => properties[id]?.distances?.publicTransport;
export const selectSea = ({ property: { id, properties } }: RootState) =>
    properties[id]?.distances?.sea;
export const selectSchools = ({ property: { id, properties } }: RootState) =>
    properties[id]?.distances?.schools;
export const selectSupermarket = ({
    property: { id, properties },
}: RootState) => properties[id]?.distances?.supermarket;
export const selectCafeRestaurant = ({
    property: { id, properties },
}: RootState) => properties[id]?.distances?.cafeRestaurant;
export const selectHospital = ({ property: { id, properties } }: RootState) =>
    properties[id]?.distances?.hospital;
export const selectAirport = ({ property: { id, properties } }: RootState) =>
    properties[id]?.distances?.airport;

// Construction
export const selectYearOfConstruction = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.yearOfConstruction;
export const selectNewlyBuilt = ({ property: { id, properties } }: RootState) =>
    properties[id]?.construction?.newlyBuilt;
export const selectIncomplete = ({ property: { id, properties } }: RootState) =>
    properties[id]?.construction?.incomplete;
export const selectUnderConstruction = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.underConstruction;
export const selectTotalFloorNumber = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.totalFloorNumber;
export const selectElevator = ({ property: { id, properties } }: RootState) =>
    properties[id]?.construction?.elevator;
export const selectInternalStairs = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.internalStairs;
export const selectNeoclassical = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.neoclassical;
export const selectYearOfRenovation = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.yearOfRenovation;
export const selectRenovated = ({ property: { id, properties } }: RootState) =>
    properties[id]?.construction?.renovated;
export const selectNeedsRenovation = ({
    property: { id, properties },
}: RootState) => properties[id]?.construction?.needsRenovation;
export const selectPreserved = ({ property: { id, properties } }: RootState) =>
    properties[id]?.construction?.preserved;

export const selectPool = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.pool;

export const selectOffice = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.office;

export const selectInternet = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.internet;

export const selectThermalInsulation = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.thermalInsulation;

export const selectSeaView = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.seaView;

export const selectGuestroom = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.guestroom;

export const selectQuietArea = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.quietArea;

export const selectSoundInsulation = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.soundInsulation;

export const selectHas24HoursSecurity = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.has24HoursSecurity;

export const selectBarbeque = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.barbeque;

export const selectCctv = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.cctv;

export const selectCombinedKitchenAndDiningArea = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.combinedKitchenAndDiningArea;

export const selectFireDetector = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.fireDetector;

export const selectHomeCinema = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.homeCinema;

export const selectJacuzzi = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.jacuzzi;

export const selectNearBusRoute = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.nearBusRoute;

export const selectPanoramicView = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.panoramicView;

export const selectPlayRoom = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.playroom;
export const selectHasAttic = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.attic;

//Property Description
export const selectFloorApartment = ({
    property: { id, properties },
}: RootState) => properties[id]?.details?.floorApartment;
export const selectPenthouse = ({ property: { id, properties } }: RootState) =>
    properties[id]?.details?.penthouse;

export const selectAccessForDisable = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.accessForDisabled;

export const selectSmartHome = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.smartHome;

export const selectMountainView = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.mountainView;

export const selectSeaFront = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.seaFront;

export const selectHeatedPool = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.heatedPool;

export const selectIndoorPool = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.indoorPool;

export const selectOrganizedGarden = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.organizedGarden;

export const selectWell = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.well;

export const selectDrilling = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.drilling;

export const selectMasonryFence = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.masonryFence;

export const selectAccessForDisabled = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.accessForDisabled;

export const selectIndependentHeatingPerRoom = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.independentHeatingPerRoom;

export const selectAdaptingToTheGround = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.adaptingToTheGround;

export const selectView = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.view;

export const selectFacade = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.facade;

export const selectCorner = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.corner;

export const selectVeranda = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.veranda;

export const selectTents = ({ property: { id, properties } }: RootState) =>
    properties[id]?.features?.tents;

export const selectWithinResidentialZone = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.withinResidentialZone;

export const selectWithinCityPlan = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.withinCityPlan;

export const selectWalkableDistanceToBeach = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.walkableDistanceToBeach;

export const selectLoadingDock = ({
    property: { id, properties },
}: RootState) => properties[id]?.features?.loadingDock;

export const selectLabelIDs = ({ property: { id, properties } }: RootState) =>
    properties[id]?.labelIDs;

export const { reducer } = slice;
