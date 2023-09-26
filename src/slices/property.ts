import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ILocation } from "src/types/location";
import { IProperties, IPropertiesPOST } from "src/types/properties";

type propertyState = IPropertiesPOST;

const initialState: propertyState = {
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
    debatablePrice: false,
    buildable: false,
    video: "",
    description: "",
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
        energyClass: "",
        heatingType: "",
        heatingSystem: "",
        electricityType: "",
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
        furnished: "",
        frameType: "",
        paneGlassType: "",
        windowScreens: false,
        fireplace: false,
        bright: false,
        luxurious: false,
        electricCarChargingFacilities: false,
        reception: false,
        petsAllowed: false,
        floorType: "",
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
        floor: "",
        attic: false,
        storeroom: false,
        playroom: false,
        floorApartment: false,
        penthouse: false,
        orientation: "",
        viewType: "",
        accessibility: "",
        landUse: "",
        zoneType: "",
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

const slice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setCode(state: propertyState, action): void {
            state.code = action.payload;
        },
        setOwner(state: propertyState, action): void {
            state.ownerId = action.payload;
        },
        setRentalPeriodStart(state: propertyState, action): void {
            state.rentalStart = action.payload;
        },
        setAuction(state: propertyState, action): void {
            state.auction = action.payload;
        },
        setDebatablePrice(state: propertyState, action): void {
            state.debatablePrice = action.payload;
        },
        setRentalPeriodEnd(state: propertyState, action): void {
            state.rentalEnd = action.payload;
        },
        setParentCategory(state: propertyState, action): void {
            state.parentCategory = action.payload;
        },
        setManager(state: propertyState, action): void {
            state.managerId = action.payload;
        },
        setCategory(state: propertyState, action): void {
            state.category = action.payload;
        },
        setState(state: propertyState, action): void {
            state.state = action.payload;
        },
        setPrice(state: propertyState, action): void {
            state.price = action.payload;
        },
        setRented(state: propertyState, action): void {
            state.rented = action.payload;
        },

        setCurrentRentPrice(state: propertyState, action): void {
            state.currentRentPrice = action.payload;
        },
        setEstimatedRentPrice(state: propertyState, action): void {
            state.estimatedRentPrice = action.payload;
        },

        setCoverageFactor(state: propertyState, action): void {
            state.technicalFeatures.coverageFactor = action.payload;
        },
        setKeyCode(state: propertyState, action): void {
            state.keyCode = action.payload;
        },

        setBuildable(state: propertyState, action): void {
            state.buildable = action.payload;
        },
        setDescription(state: propertyState, action): void {
            state.description = action.payload;
        },

        // Location
        setStreet(state: propertyState, action): void {
            state.location.street = action.payload;
        },
        setNumber(state: propertyState, action): void {
            state.location.number = action.payload;
        },
        setComplex(state: propertyState, action): void {
            state.location.complex = action.payload;
        },
        setCity(state: propertyState, action): void {
            state.location.city = action.payload;
        },
        setZipCode(state: propertyState, action): void {
            state.location.zipCode = action.payload;
        },
        setRegion(state: propertyState, action): void {
            state.location.region = action.payload;
        },
        setCountry(state: propertyState, action): void {
            state.location.country = action.payload;
        },
        setLatitude(state: propertyState, action): void {
            state.location.lat = action.payload;
        },
        setLongitude(state: propertyState, action): void {
            state.location.lng = action.payload;
        },

        setOrientation(state: propertyState, action): void {
            state.details.orientation = action.payload;
        },
        setLandUse(state: propertyState, action): void {
            state.details.landUse = action.payload;
        },
        setViewType(state: propertyState, action): void {
            state.details.viewType = action.payload;
        },
        setAccessibility(state: propertyState, action): void {
            state.details.accessibility = action.payload;
        },
        setRooms(state: propertyState, action): void {
            state.details.rooms = action.payload;
        },
        setEnergyClass(state: propertyState, action): void {
            state.heatingAndEnergy.energyClass = action.payload;
        },
        setOffPeakElectricity(state: propertyState, action): void {
            state.heatingAndEnergy.offPeakElectricity = action.payload;
        },
        setZoneType(state: propertyState, action): void {
            state.details.zoneType = action.payload;
        },
        setElectricityType(state: propertyState, action): void {
            state.heatingAndEnergy.electricityType = action.payload;
        },
        setFloor(state: propertyState, action): void {
            state.details.floor = action.payload;
        },
        setKitchens(state: propertyState, action): void {
            state.details.kitchens = action.payload;
        },
        setLayers(state: propertyState, action): void {
            state.details.layers = action.payload;
        },
        setBathrooms(state: propertyState, action): void {
            state.details.bathrooms = action.payload;
        },
        setNumOfWC(state: propertyState, action): void {
            state.details.wc = action.payload;
        },
        setLivingRooms(state: propertyState, action): void {
            state.details.livingrooms = action.payload;
        },
        setBedrooms(state: propertyState, action): void {
            state.details.bedrooms = action.payload;
        },
        setAvgUtils(state: propertyState, action): void {
            state.averageUtils = action.payload;
        },

        // Areas
        setStoreroom(state: propertyState, action): void {
            state.areas.storeroom = action.payload;
        },
        setCovered(state: propertyState, action): void {
            state.areas.covered = action.payload;
        },
        setBasement(state: propertyState, action): void {
            state.areas.basement = action.payload;
        },
        setAttic(state: propertyState, action): void {
            state.areas.attic = action.payload;
        },
        setGarden(state: propertyState, action): void {
            state.areas.garden = action.payload;
        },
        setArea(state: propertyState, action): void {
            state.area = action.payload;
        },
        setGroundFloor(state: propertyState, action): void {
            state.areas.groundFloor = action.payload;
        },
        setFirst(state: propertyState, action): void {
            state.areas.first = action.payload;
        },
        setSecond(state: propertyState, action): void {
            state.areas.second = action.payload;
        },
        setThird(state: propertyState, action): void {
            state.areas.third = action.payload;
        },
        setFourth(state: propertyState, action): void {
            state.areas.fourth = action.payload;
        },
        setFifth(state: propertyState, action): void {
            state.areas.fifth = action.payload;
        },

        setPlotArea(state: propertyState, action): void {
            state.plotArea = action.payload;
        },

        setStoreroomBool(state: propertyState, action): void {
            state.details.storeroom = action.payload;
        },
        setHeatingType(state: propertyState, action): void {
            state.heatingAndEnergy.heatingType = action.payload;
        },
        setHeatingSystem(state: propertyState, action): void {
            state.heatingAndEnergy.heatingSystem = action.payload;
        },
        setFloorHeating(state: propertyState, action): void {
            state.heatingAndEnergy.floorHeating = action.payload;
        },
        setAirConditioning(state: propertyState, action): void {
            state.heatingAndEnergy.airConditioning = action.payload;
        },

        // Parkings & Balconies

        addParking(state: propertyState, { payload }) {
            state.details.parkings.push(payload);
        },
        removeParking(state: propertyState, { payload }) {
            const indexToRemove = payload;
            if (indexToRemove === null) return;

            const newArray = [
                ...state.details.parkings.slice(0, indexToRemove),
                ...state.details.parkings.slice(indexToRemove + 1),
            ];

            state.details.parkings = newArray;
        },
        setParkingType(state: propertyState, { payload }) {
            const index = payload.parkingIndex;
            const type = payload.type;
            if (index === null || !type) return;

            state.details.parkings[index].parkingType = type;
        },
        setParkingSpots(state: propertyState, { payload }) {
            const index = payload.parkingIndex;
            const spots = payload.spots;
            if (index === null || !spots) return;

            state.details.parkings[index].spots = spots;
        },
        addBalcony(state: propertyState, { payload }) {
            state.details.balconies.push(payload);
        },
        removeBalcony(state: propertyState, { payload }) {
            const indexToRemove = payload;
            if (
                indexToRemove === null ||
                indexToRemove > state.details.balconies.length
            )
                return;

            state.details.balconies = state.details.balconies.filter(
                (_, i) => i !== indexToRemove
            );
        },

        setBalconySide(state: propertyState, { payload }) {
            const index = payload.balconyIndex;
            const side = payload.side;
            if (index === null || !side) return;

            state.details.balconies[index].side = side;
        },
        setBalconyArea(state: propertyState, { payload }) {
            const index = payload.balconyIndex;
            const area = payload.area;
            if (index === null || !area) return;

            state.details.balconies[index].area = area;
        },

        setBalconies(state: propertyState, action) {
            state.areas.balconies = action.payload;
        },
        setYearOfConstruction(state: propertyState, action): void {
            state.construction.yearOfConstruction = action.payload;
        },
        setUnderConstruction(state: propertyState, action): void {
            state.construction.underConstruction = action.payload;
        },
        setNewlyBuilt(state: propertyState, action): void {
            state.construction.newlyBuilt = action.payload;
        },
        setIncomplete(state: propertyState, action): void {
            state.construction.incomplete = action.payload;
        },
        setTotalFloorNumber(state: propertyState, action): void {
            state.construction.totalFloorNumber = action.payload;
        },
        setElevator(state: propertyState, action): void {
            state.construction.elevator = action.payload;
        },
        setInternalStairs(state: propertyState, action): void {
            state.construction.internalStairs = action.payload;
        },
        setAvailableAfter(state: propertyState, action): void {
            state.availableAfter = action.payload;
        },
        setVideo(state: propertyState, action): void {
            state.video = action.payload;
        },

        setNeoclassical(state: propertyState, action): void {
            state.construction.neoclassical = action.payload;
        },
        setYearOfRenovation(state: propertyState, action): void {
            state.construction.yearOfRenovation = action.payload;
        },
        setRenovated(state: propertyState, action): void {
            state.construction.renovated = action.payload;
        },
        setNeedsRenovation(state: propertyState, action): void {
            state.construction.needsRenovation = action.payload;
        },
        setPreserved(state: propertyState, action): void {
            state.construction.preserved = action.payload;
        },
        setPublicTransportation(state: propertyState, action): void {
            state.distances.publicTransport = action.payload;
        },
        setSea(state: propertyState, action): void {
            state.distances.sea = action.payload;
        },
        setSchools(state: propertyState, action): void {
            state.distances.schools = action.payload;
        },
        setSupermarket(state: propertyState, action): void {
            state.distances.supermarket = action.payload;
        },
        setCafeRestaurant(state: propertyState, action): void {
            state.distances.cafeRestaurant = action.payload;
        },
        setHospital(state: propertyState, action): void {
            state.distances.hospital = action.payload;
        },
        setAirport(state: propertyState, action): void {
            state.distances.airport = action.payload;
        },
        setPool(state: propertyState, action): void {
            state.features.pool = action.payload;
        },

        setAccessForDisable(state: propertyState, action): void {
            state.features.accessForDisabled = action.payload;
        },

        setSolarBoiler(state: propertyState, action): void {
            state.heatingAndEnergy.solarBoiler = action.payload;
        },

        setOffice(state: propertyState, action): void {
            state.features.office = action.payload;
        },

        setInternet(state: propertyState, action): void {
            state.features.internet = action.payload;
        },

        setThermalInsulation(state: propertyState, action): void {
            state.features.thermalInsulation = action.payload;
        },

        setSeaView(state: propertyState, action): void {
            state.features.seaView = action.payload;
        },

        setGuestroom(state: propertyState, action): void {
            state.features.guestroom = action.payload;
        },

        setQuietArea(state: propertyState, action): void {
            state.features.quietArea = action.payload;
        },

        setSoundInsulation(state: propertyState, action): void {
            state.features.soundInsulation = action.payload;
        },

        setHas24HoursSecurity(state: propertyState, action): void {
            state.features.has24HoursSecurity = action.payload;
        },

        setHasAttic(state: propertyState, action): void {
            state.details.attic = action.payload;
        },

        setBarbeque(state: propertyState, action): void {
            state.features.barbeque = action.payload;
        },

        setCctv(state: propertyState, action): void {
            state.features.cctv = action.payload;
        },

        setCombinedKitchenAndDiningArea(state: propertyState, action): void {
            state.features.combinedKitchenAndDiningArea = action.payload;
        },

        setFireDetector(state: propertyState, action): void {
            state.features.fireDetector = action.payload;
        },

        setHomeCinema(state: propertyState, action): void {
            state.features.homeCinema = action.payload;
        },
        setJacuzzi(state: propertyState, action): void {
            state.features.jacuzzi = action.payload;
        },

        setNearBusRoute(state: propertyState, action): void {
            state.features.nearBusRoute = action.payload;
        },

        setPanoramicView(state: propertyState, action): void {
            state.features.panoramicView = action.payload;
        },

        setPlayRoom(state: propertyState, action): void {
            state.details.playroom = action.payload;
        },

        setSmartHome(state: propertyState, action): void {
            state.features.smartHome = action.payload;
        },

        setMountainView(state: propertyState, action): void {
            state.features.mountainView = action.payload;
        },

        setSeaFront(state: propertyState, action): void {
            state.features.seaFront = action.payload;
        },

        setHeatedPool(state: propertyState, action): void {
            state.features.heatedPool = action.payload;
        },

        setIndoorPool(state: propertyState, action): void {
            state.features.indoorPool = action.payload;
        },

        setOrganizedGarden(state: propertyState, action): void {
            state.features.organizedGarden = action.payload;
        },

        setWell(state: propertyState, action): void {
            state.features.well = action.payload;
        },

        setDrilling(state: propertyState, action): void {
            state.features.drilling = action.payload;
        },

        setMasonryFence(state: propertyState, action): void {
            state.features.masonryFence = action.payload;
        },

        setAccessForDisabled(state: propertyState, action): void {
            state.features.accessForDisabled = action.payload;
        },

        setIndependentHeatingPerRoom(state: propertyState, action): void {
            state.features.independentHeatingPerRoom = action.payload;
        },

        setAdaptingToTheGround(state: propertyState, action): void {
            state.features.adaptingToTheGround = action.payload;
        },

        setView(state: propertyState, action): void {
            state.features.view = action.payload;
        },

        setFacade(state: propertyState, action): void {
            state.features.facade = action.payload;
        },
        setLoadingDock(state: propertyState, action): void {
            state.features.loadingDock = action.payload;
        },

        setCorner(state: propertyState, action): void {
            state.features.corner = action.payload;
        },

        setVeranda(state: propertyState, action): void {
            state.features.veranda = action.payload;
        },

        setTents(state: propertyState, action): void {
            state.features.tents = action.payload;
        },

        setWithinResidentialZone(state: propertyState, action): void {
            state.features.withinResidentialZone = action.payload;
        },

        setWithinCityPlan(state: propertyState, action): void {
            state.features.withinCityPlan = action.payload;
        },

        setWalkableDistanceToBeach(state: propertyState, action): void {
            state.features.walkableDistanceToBeach = action.payload;
        },

        setFloorApartment(state: propertyState, action): void {
            state.details.floorApartment = action.payload;
        },
        setPenthouse(state: propertyState, action): void {
            state.details.penthouse = action.payload;
        },
        setEntrances(state: propertyState, action): void {
            state.technicalFeatures.entrances = action.payload;
        },

        setDisplayWindowsLength(state: propertyState, action): void {
            state.technicalFeatures.displayWindowsLength = action.payload;
        },

        setSafetyDoor(state: propertyState, action): void {
            state.technicalFeatures.safetyDoor = action.payload;
        },

        setAlarmSystem(state: propertyState, action): void {
            state.technicalFeatures.alarmSystem = action.payload;
        },

        setPainted(state: propertyState, action): void {
            state.technicalFeatures.painted = action.payload;
        },

        setFurnished(state: propertyState, action): void {
            state.technicalFeatures.furnished = action.payload;
        },

        setFrameType(state: propertyState, action): void {
            state.technicalFeatures.frameType = action.payload;
        },

        setPaneGlassType(state: propertyState, action): void {
            state.technicalFeatures.paneGlassType = action.payload;
        },

        setWindowScreens(state: propertyState, action): void {
            state.technicalFeatures.windowScreens = action.payload;
        },

        setFireplace(state: propertyState, action): void {
            state.technicalFeatures.fireplace = action.payload;
        },

        setBright(state: propertyState, action): void {
            state.technicalFeatures.bright = action.payload;
        },

        setLuxurious(state: propertyState, action): void {
            state.technicalFeatures.luxurious = action.payload;
        },

        setElectricCarChargingFacilities(state: propertyState, action): void {
            state.technicalFeatures.electricCarChargingFacilities =
                action.payload;
        },

        setReception(state: propertyState, action): void {
            state.technicalFeatures.reception = action.payload;
        },

        setPetsAllowed(state: propertyState, action): void {
            state.technicalFeatures.petsAllowed = action.payload;
        },

        setFloorType(state: propertyState, action): void {
            state.technicalFeatures.floorType = action.payload;
        },

        setSatelliteTV(state: propertyState, action): void {
            state.technicalFeatures.satelliteTV = action.payload;
        },

        setWiring(state: propertyState, action): void {
            state.technicalFeatures.wiring = action.payload;
        },

        setLoadingUnloadingElevator(state: propertyState, action): void {
            state.technicalFeatures.loadingUnloadingElevator = action.payload;
        },

        setFalseCeiling(state: propertyState, action): void {
            state.technicalFeatures.falseCeiling = action.payload;
        },

        setWithEquipment(state: propertyState, action): void {
            state.technicalFeatures.withEquipment = action.payload;
        },

        setDoubleFrontage(state: propertyState, action): void {
            state.technicalFeatures.doubleFrontage = action.payload;
        },

        setConsideration(state: propertyState, action): void {
            state.technicalFeatures.consideration = action.payload;
        },

        setFloorToAreaRatio(state: propertyState, action): void {
            state.technicalFeatures.floorToAreaRatio = action.payload;
        },
        setFacadeLength(state: propertyState, action): void {
            state.technicalFeatures.facadeLength = action.payload;
        },

        setInclination(state: propertyState, action): void {
            state.technicalFeatures.inclination = action.payload;
        },

        setStudent(state: propertyState, action): void {
            state.suitableFor.student = action.payload;
        },
        setAgriculturalUse(state: propertyState, action): void {
            state.suitableFor.agriculturalUse = action.payload;
        },
        setCottage(state: propertyState, action): void {
            state.suitableFor.cottage = action.payload;
        },
        setTouristRental(state: propertyState, action): void {
            state.suitableFor.touristRental = action.payload;
        },
        setInvestment(state: propertyState, action): void {
            state.suitableFor.investment = action.payload;
        },
        setDoctorsOffice(state: propertyState, action): void {
            state.suitableFor.doctorsOffice = action.payload;
        },
        setProfessionalUse(state: propertyState, action): void {
            state.suitableFor.professionalUse = action.payload;
        },
        setRenovation(state: propertyState, action): void {
            state.suitableFor.renovation = action.payload;
        },

        addLabel(state: propertyState, action): void {
            if (!state.labelIDs.includes(action.payload))
                state.labelIDs.push(action.payload);
        },
        removeLabel(state: propertyState, { payload }): void {
            // INFO: removes based on array index (contrary to addLabel)
            const index = payload;
            state.labelIDs = state.labelIDs.filter((_, i) => i !== index);
        },
        setDefaultState: (state: propertyState, action): void => {
            state = initialState;
        },

        setInitialState: (state: propertyState, action): void => {
            const payload: IProperties = action.payload;
            const { details, heatingAndEnergy, technicalFeatures } = payload;

            // INFO: we don't get a valid value, use the one on the initialState which is non-null but always means "unset";
            //        this way we prevent nulls and at the same time show the values as empty

            state.code = payload.code || state.code;
            state.title = payload.title || state.title;
            state.managerId = payload.manager?.id || state.managerId;
            state.ownerId = payload.owner?.id || state.ownerId;
            state.state = payload.state.key || state.state;
            state.parentCategory =
                payload.parentCategory.key || state.parentCategory;
            state.category = payload.category.key || state.category;
            state.area = payload.area || state.area;
            state.plotArea = payload.plotArea || state.plotArea;
            state.price = payload.price || state.price;
            state.averageUtils = payload.averageUtils || state.averageUtils;
            state.rented = payload.rented || state.rented;
            state.currentRentPrice =
                payload.currentRentPrice || state.currentRentPrice;
            state.estimatedRentPrice =
                payload.estimatedRentPrice || state.estimatedRentPrice;
            state.rentalStart = payload.rentalStart || state.rentalStart;
            state.rentalEnd = payload.rentalEnd || state.rentalEnd;
            state.availableAfter =
                payload.availableAfter || state.availableAfter;
            state.keyCode = payload.keyCode || state.keyCode;
            state.auction = payload.auction || state.auction;
            state.debatablePrice =
                payload.debatablePrice || state.debatablePrice;
            state.buildable = payload.buildable || state.buildable;
            state.video = payload.video || state.video;
            state.description = payload.description || state.description;

            // Details
            state.details.floor =
                details?.floor.key || initialState.details.floor;
            state.details.bedrooms =
                details?.bedrooms || initialState.details.bedrooms;
            state.details.kitchens =
                details?.kitchens || initialState.details.kitchens;
            state.details.wc = details?.wc || initialState.details.wc;
            state.details.layers =
                details?.layers || initialState.details.layers;
            state.details.livingrooms =
                details?.livingrooms || initialState.details.livingrooms;
            state.details.bathrooms =
                details?.bathrooms || initialState.details.bathrooms;
            state.details.rooms = details?.rooms || initialState.details.rooms;
            state.details.attic = details?.attic || initialState.details.attic;
            state.details.storeroom =
                details?.storeroom || initialState.details.storeroom;
            state.details.playroom =
                details?.playroom || initialState.details.playroom;
            state.details.floorApartment =
                details?.floorApartment || initialState.details.floorApartment;
            state.details.penthouse =
                details?.penthouse || initialState.details.penthouse;
            state.details.orientation =
                details?.orientation.key || initialState.details.orientation;
            state.details.viewType =
                details?.viewType.key || initialState.details.viewType;
            state.details.accessibility =
                details?.accessibility.key ||
                initialState.details.accessibility;
            state.details.landUse =
                details?.landUse.key || initialState.details.landUse;
            state.details.zoneType =
                details?.zoneType.key || initialState.details.zoneType;
            state.details.parkings =
                details?.parkings.map((parking) => ({
                    spots: parking.spots,
                    parkingType: parking.parkingType.key,
                })) || initialState.details.parkings;
            state.details.balconies =
                details?.balconies.map((balcony) => ({
                    area: balcony.area,
                    side: balcony.side.key,
                })) || initialState.details.balconies;

            // Heating & Energy
            state.heatingAndEnergy.energyClass =
                heatingAndEnergy?.energyClass.key ||
                initialState.heatingAndEnergy.energyClass;
            state.heatingAndEnergy.heatingType =
                heatingAndEnergy?.heatingType.key ||
                initialState.heatingAndEnergy.heatingType;
            state.heatingAndEnergy.heatingSystem =
                heatingAndEnergy?.heatingSystem.key ||
                initialState.heatingAndEnergy.heatingSystem;
            state.heatingAndEnergy.electricityType =
                heatingAndEnergy?.electricityType.key ||
                initialState.heatingAndEnergy.electricityType;
            state.heatingAndEnergy.floorHeating =
                heatingAndEnergy?.floorHeating ||
                initialState.heatingAndEnergy.floorHeating;
            state.heatingAndEnergy.airConditioning =
                heatingAndEnergy?.airConditioning ||
                initialState.heatingAndEnergy.airConditioning;
            state.heatingAndEnergy.solarBoiler =
                heatingAndEnergy?.solarBoiler ||
                initialState.heatingAndEnergy.solarBoiler;
            state.heatingAndEnergy.offPeakElectricity =
                heatingAndEnergy?.offPeakElectricity ||
                initialState.heatingAndEnergy.offPeakElectricity;
            // Suitable For
            state.suitableFor = payload.suitableFor || initialState.suitableFor;
            // Distances
            state.distances = payload.distances || initialState.distances;
            // Construction
            state.construction =
                payload.construction || initialState.construction;
            // Features
            state.features = payload.features || initialState.features;
            // Technical Features
            state.technicalFeatures.entrances =
                technicalFeatures?.entrances ||
                initialState.technicalFeatures.entrances;
            state.technicalFeatures.displayWindowsLength =
                technicalFeatures?.displayWindowsLength ||
                initialState.technicalFeatures.displayWindowsLength;
            state.technicalFeatures.safetyDoor =
                technicalFeatures?.safetyDoor ||
                initialState.technicalFeatures.safetyDoor;
            state.technicalFeatures.alarmSystem =
                technicalFeatures?.alarmSystem ||
                initialState.technicalFeatures.alarmSystem;
            state.technicalFeatures.painted =
                technicalFeatures?.painted ||
                initialState.technicalFeatures.painted;
            state.technicalFeatures.furnished =
                technicalFeatures?.furnished.key ||
                initialState.technicalFeatures.furnished;
            state.technicalFeatures.frameType =
                technicalFeatures?.frameType.key ||
                initialState.technicalFeatures.frameType;
            state.technicalFeatures.paneGlassType =
                technicalFeatures?.paneGlassType.key ||
                initialState.technicalFeatures.paneGlassType;
            state.technicalFeatures.windowScreens =
                technicalFeatures?.windowScreens ||
                initialState.technicalFeatures.windowScreens;
            state.technicalFeatures.fireplace =
                technicalFeatures?.fireplace ||
                initialState.technicalFeatures.fireplace;
            state.technicalFeatures.bright =
                technicalFeatures?.bright ||
                initialState.technicalFeatures.bright;
            state.technicalFeatures.luxurious =
                technicalFeatures?.luxurious ||
                initialState.technicalFeatures.luxurious;
            state.technicalFeatures.electricCarChargingFacilities =
                technicalFeatures?.electricCarChargingFacilities ||
                initialState.technicalFeatures.electricCarChargingFacilities;
            state.technicalFeatures.reception =
                technicalFeatures?.reception ||
                initialState.technicalFeatures.reception;
            state.technicalFeatures.petsAllowed =
                technicalFeatures?.petsAllowed ||
                initialState.technicalFeatures.petsAllowed;
            state.technicalFeatures.floorType =
                technicalFeatures?.floorType.key ||
                initialState.technicalFeatures.floorType;
            state.technicalFeatures.satelliteTV =
                technicalFeatures?.satelliteTV ||
                initialState.technicalFeatures.satelliteTV;
            state.technicalFeatures.wiring =
                technicalFeatures?.wiring ||
                initialState.technicalFeatures.wiring;
            state.technicalFeatures.loadingUnloadingElevator =
                technicalFeatures?.loadingUnloadingElevator ||
                initialState.technicalFeatures.loadingUnloadingElevator;
            state.technicalFeatures.falseCeiling =
                technicalFeatures?.falseCeiling ||
                initialState.technicalFeatures.falseCeiling;
            state.technicalFeatures.withEquipment =
                technicalFeatures?.withEquipment ||
                initialState.technicalFeatures.withEquipment;
            state.technicalFeatures.doubleFrontage =
                technicalFeatures?.doubleFrontage ||
                initialState.technicalFeatures.doubleFrontage;
            state.technicalFeatures.consideration =
                technicalFeatures?.consideration ||
                initialState.technicalFeatures.consideration;
            state.technicalFeatures.floorToAreaRatio =
                technicalFeatures?.floorToAreaRatio ||
                initialState.technicalFeatures.floorToAreaRatio;
            state.technicalFeatures.coverageFactor =
                technicalFeatures?.coverageFactor ||
                initialState.technicalFeatures.coverageFactor;
            state.technicalFeatures.facadeLength =
                technicalFeatures?.facadeLength ||
                initialState.technicalFeatures.facadeLength;
            state.technicalFeatures.inclination =
                technicalFeatures?.inclination.key ||
                initialState.technicalFeatures.inclination;

            // areas
            state.areas = payload.areas || initialState.areas;

            // Location (convert from ILocationPOST to ILocation)
            const location: ILocation = payload.location;
            state.location.city = location?.city || initialState.location.city;
            state.location.country =
                location?.country || initialState.location.country;
            state.location.number =
                location?.number || initialState.location.number;
            state.location.region =
                location?.region || initialState.location.region;
            state.location.street =
                location?.street || initialState.location.street;
            state.location.zipCode =
                location?.zipCode || initialState.location.zipCode;
            state.location.complex =
                location?.complex || initialState.location.complex;
            state.location.lat = location?.lat || initialState.location.lat;
            state.location.lng = location?.lng || initialState.location.lng;

            // map labels
            state.labelIDs = payload.labels
                ? payload.labels
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

export const selectAll = ({ property }: RootState) => property;

export const selectCode = ({ property }: RootState) => property.code;
export const selectRentalPeriodStart = ({ property }: RootState) =>
    property.rentalStart;
export const selectRentalPeriodEnd = ({ property }: RootState) =>
    property.rentalEnd;

export const selectOwner = ({ property }: RootState) => property.ownerId;
export const selectManager = ({ property }: RootState) => property.managerId;
export const selectCategory = ({ property }: RootState) => property.category;
export const selectState = ({ property }: RootState) => property.state;
export const selectCurrentRentPrice = ({ property }: RootState) =>
    property.currentRentPrice;
export const selectEstimatedRentPrice = ({ property }: RootState) =>
    property.estimatedRentPrice;

export const selectAuction = ({ property }: RootState) => property.auction;
export const selectDebatablePrice = ({ property }: RootState) =>
    property.debatablePrice;
export const selectPrice = ({ property }: RootState) => property.price;
export const selectArea = ({ property }: RootState) => property.area;
export const selectPlotArea = ({ property }: RootState) => property.plotArea;
export const selectParentCategory = ({ property }: RootState) =>
    property.parentCategory;
export const selectAvgUtils = ({ property }: RootState) =>
    property.averageUtils;
export const selectKeyCode = ({ property }: RootState) => property.keyCode;
export const selectBuildable = ({ property }: RootState) => property.buildable;
export const selectDescription = ({ property }: RootState) =>
    property.description;
export const selectAvailableAfter = ({ property }: RootState) =>
    property.availableAfter;
export const selectVideo = ({ property }: RootState) => property.video;
export const selectRented = ({ property }: RootState) => property.rented;

// Location
export const selectStreet = ({ property }: RootState) =>
    property.location?.street;
export const selectNumber = ({ property }: RootState) =>
    property.location?.number;
export const selectComplex = ({ property }: RootState) =>
    property.location?.complex;
export const selectCity = ({ property }: RootState) => property.location?.city;
export const selectZipCode = ({ property }: RootState) =>
    property.location?.zipCode;
export const selectRegion = ({ property }: RootState) =>
    property.location?.region;
export const selectCountry = ({ property }: RootState) =>
    property.location?.country;
export const selectLatitude = ({ property }: RootState) =>
    property.location?.lat;
export const selectLongitude = ({ property }: RootState) =>
    property.location?.lng;

// Details
export const selectOrientation = ({ property }: RootState) =>
    property.details?.orientation;
export const selectLandUse = ({ property }: RootState) =>
    property.details?.landUse;
export const selectViewType = ({ property }: RootState) =>
    property.details?.viewType;
export const selectAccessibility = ({ property }: RootState) =>
    property.details?.accessibility;
export const selectFloor = ({ property }: RootState) => property.details?.floor;
export const selectKitchens = ({ property }: RootState) =>
    property.details?.kitchens;
export const selectLayers = ({ property }: RootState) =>
    property.details?.layers;
export const selectBathrooms = ({ property }: RootState) =>
    property.details?.bathrooms;
export const selectNumOfWC = ({ property }: RootState) => property.details?.wc;
export const selectLivingRooms = ({ property }: RootState) =>
    property.details?.livingrooms;
export const selectBedrooms = ({ property }: RootState) =>
    property.details?.bedrooms;
export const selectStoreroomBool = ({ property }: RootState) =>
    property.details?.storeroom;
export const selectRooms = ({ property }: RootState) => property.details?.rooms;

// Heating
export const selectElectricityType = ({ property }: RootState) =>
    property.heatingAndEnergy?.electricityType;
export const selectSolarBoiler = ({ property }: RootState) =>
    property.heatingAndEnergy?.solarBoiler;
export const selectEnergyClass = ({ property }: RootState) =>
    property.heatingAndEnergy?.energyClass;
export const selectOffPeakElectricity = ({ property }: RootState) =>
    property.heatingAndEnergy?.offPeakElectricity;
export const selectZoneType = ({ property }: RootState) =>
    property.details?.zoneType;
export const selectHeatingSystem = ({ property }: RootState) =>
    property.heatingAndEnergy?.heatingSystem;
export const selectHeatingType = ({ property }: RootState) =>
    property.heatingAndEnergy?.heatingType;
export const selectFloorHeating = ({ property }: RootState) =>
    property.heatingAndEnergy?.floorHeating;
export const selectAirConditioning = ({ property }: RootState) =>
    property.heatingAndEnergy?.airConditioning;

// Suitable For
export const selectStudent = ({ property }: RootState) =>
    property.suitableFor?.student;
export const selectCottage = ({ property }: RootState) =>
    property.suitableFor?.cottage;
export const selectTouristRental = ({ property }: RootState) =>
    property.suitableFor?.touristRental;
export const selectInvestment = ({ property }: RootState) =>
    property.suitableFor?.investment;
export const selectDoctorsOffice = ({ property }: RootState) =>
    property.suitableFor?.doctorsOffice;
export const selectProfessionalUse = ({ property }: RootState) =>
    property.suitableFor?.professionalUse;
export const selectRenovation = ({ property }: RootState) =>
    property.suitableFor?.renovation;
export const selectAgriculturalUse = ({ property }: RootState) =>
    property.suitableFor?.agriculturalUse;

// Technical Features
export const selectDisplayWindowsLength = ({ property }: RootState) =>
    property.technicalFeatures?.displayWindowsLength;

export const selectSafetyDoor = ({ property }: RootState) =>
    property.technicalFeatures?.safetyDoor;

export const selectAlarmSystem = ({ property }: RootState) =>
    property.technicalFeatures?.alarmSystem;

export const selectPainted = ({ property }: RootState) =>
    property.technicalFeatures?.painted;

export const selectFurnished = ({ property }: RootState) =>
    property.technicalFeatures?.furnished;

export const selectFrameType = ({ property }: RootState) =>
    property.technicalFeatures?.frameType;

export const selectPaneGlassType = ({ property }: RootState) =>
    property.technicalFeatures?.paneGlassType;

export const selectWindowScreens = ({ property }: RootState) =>
    property.technicalFeatures?.windowScreens;

export const selectFireplace = ({ property }: RootState) =>
    property.technicalFeatures?.fireplace;

export const selectBright = ({ property }: RootState) =>
    property.technicalFeatures?.bright;

export const selectLuxurious = ({ property }: RootState) =>
    property.technicalFeatures?.luxurious;

export const selectElectricCarChargingFacilities = ({ property }: RootState) =>
    property.technicalFeatures?.electricCarChargingFacilities;

export const selectReception = ({ property }: RootState) =>
    property.technicalFeatures?.reception;

export const selectPetsAllowed = ({ property }: RootState) =>
    property.technicalFeatures?.petsAllowed;

export const selectFloorType = ({ property }: RootState) =>
    property.technicalFeatures?.floorType;

export const selectSatelliteTV = ({ property }: RootState) =>
    property.technicalFeatures?.satelliteTV;

export const selectWiring = ({ property }: RootState) =>
    property.technicalFeatures?.wiring;

export const selectLoadingUnloadingElevator = ({ property }: RootState) =>
    property.technicalFeatures?.loadingUnloadingElevator;

export const selectFalseCeiling = ({ property }: RootState) =>
    property.technicalFeatures?.falseCeiling;

export const selectWithEquipment = ({ property }: RootState) =>
    property.technicalFeatures?.withEquipment;

export const selectDoubleFrontage = ({ property }: RootState) =>
    property.technicalFeatures?.doubleFrontage;

export const selectConsideration = ({ property }: RootState) =>
    property.technicalFeatures?.consideration;

export const selectFloorToAreaRatio = ({ property }: RootState) =>
    property.technicalFeatures?.floorToAreaRatio;

export const selectCoverageFactor = ({ property }: RootState) =>
    property.technicalFeatures?.coverageFactor;

export const selectFacadeLength = ({ property }: RootState) =>
    property.technicalFeatures?.facadeLength;

export const selectInclination = ({ property }: RootState) =>
    property.technicalFeatures?.inclination;

export const selectEntrances = ({ property }: RootState) =>
    property.technicalFeatures?.entrances;

// Areas
export const selectBalconiesArea = ({ property }: RootState) =>
    property.areas?.balconies;
export const selectCovered = ({ property }: RootState) =>
    property.areas?.covered;
export const selectBasement = ({ property }: RootState) =>
    property.areas?.basement;
export const selectGarden = ({ property }: RootState) => property.areas?.garden;
export const selectStoreroom = ({ property }: RootState) =>
    property.areas?.storeroom;
export const selectAttic = ({ property }: RootState) => property.areas?.attic;
export const selectGroundFloor = ({ property }: RootState) =>
    property.areas?.groundFloor;
export const selectFirst = ({ property }: RootState) => property.areas?.first;
export const selectSecond = ({ property }: RootState) => property.areas?.second;
export const selectThird = ({ property }: RootState) => property.areas?.third;
export const selectFourth = ({ property }: RootState) => property.areas?.fourth;
export const selectFifth = ({ property }: RootState) => property.areas?.fifth;

// Parkings & Balconies
export const selectParkings = ({ property }: RootState) =>
    property.details?.parkings;
export const selectBalconies = ({ property }: RootState) =>
    property.details?.balconies;

// Distances
export const selectPublicTransportation = ({ property }: RootState) =>
    property.distances?.publicTransport;
export const selectSea = ({ property }: RootState) => property.distances?.sea;
export const selectSchools = ({ property }: RootState) =>
    property.distances?.schools;
export const selectSupermarket = ({ property }: RootState) =>
    property.distances?.supermarket;
export const selectCafeRestaurant = ({ property }: RootState) =>
    property.distances?.cafeRestaurant;
export const selectHospital = ({ property }: RootState) =>
    property.distances?.hospital;
export const selectAirport = ({ property }: RootState) =>
    property.distances?.airport;

// Construction
export const selectYearOfConstruction = ({ property }: RootState) =>
    property.construction?.yearOfConstruction;
export const selectNewlyBuilt = ({ property }: RootState) =>
    property.construction?.newlyBuilt;
export const selectIncomplete = ({ property }: RootState) =>
    property.construction?.incomplete;
export const selectUnderConstruction = ({ property }: RootState) =>
    property.construction?.underConstruction;
export const selectTotalFloorNumber = ({ property }: RootState) =>
    property.construction?.totalFloorNumber;
export const selectElevator = ({ property }: RootState) =>
    property.construction?.elevator;
export const selectInternalStairs = ({ property }: RootState) =>
    property.construction?.internalStairs;
export const selectNeoclassical = ({ property }: RootState) =>
    property.construction?.neoclassical;
export const selectYearOfRenovation = ({ property }: RootState) =>
    property.construction?.yearOfRenovation;
export const selectRenovated = ({ property }: RootState) =>
    property.construction?.renovated;
export const selectNeedsRenovation = ({ property }: RootState) =>
    property.construction?.needsRenovation;
export const selectPreserved = ({ property }: RootState) =>
    property.construction?.preserved;

export const selectPool = ({ property }: RootState) => property.features?.pool;

export const selectOffice = ({ property }: RootState) =>
    property.features?.office;

export const selectInternet = ({ property }: RootState) =>
    property.features?.internet;

export const selectThermalInsulation = ({ property }: RootState) =>
    property.features?.thermalInsulation;

export const selectSeaView = ({ property }: RootState) =>
    property.features?.seaView;

export const selectGuestroom = ({ property }: RootState) =>
    property.features?.guestroom;

export const selectQuietArea = ({ property }: RootState) =>
    property.features?.quietArea;

export const selectSoundInsulation = ({ property }: RootState) =>
    property.features?.soundInsulation;

export const selectHas24HoursSecurity = ({ property }: RootState) =>
    property.features?.has24HoursSecurity;

export const selectBarbeque = ({ property }: RootState) =>
    property.features?.barbeque;

export const selectCctv = ({ property }: RootState) => property.features?.cctv;

export const selectCombinedKitchenAndDiningArea = ({ property }: RootState) =>
    property.features?.combinedKitchenAndDiningArea;

export const selectFireDetector = ({ property }: RootState) =>
    property.features?.fireDetector;

export const selectHomeCinema = ({ property }: RootState) =>
    property.features?.homeCinema;

export const selectJacuzzi = ({ property }: RootState) =>
    property.features?.jacuzzi;

export const selectNearBusRoute = ({ property }: RootState) =>
    property.features?.nearBusRoute;

export const selectPanoramicView = ({ property }: RootState) =>
    property.features?.panoramicView;

export const selectPlayRoom = ({ property }: RootState) =>
    property.details?.playroom;
export const selectHasAttic = ({ property }: RootState) =>
    property.details?.attic;

//Property Description
export const selectFloorApartment = ({ property }: RootState) =>
    property.details?.floorApartment;
export const selectPenthouse = ({ property }: RootState) =>
    property.details?.penthouse;

export const selectAccessForDisable = ({ property }: RootState) =>
    property.features?.accessForDisabled;

export const selectSmartHome = ({ property }: RootState) =>
    property.features?.smartHome;

export const selectMountainView = ({ property }: RootState) =>
    property.features?.mountainView;

export const selectSeaFront = ({ property }: RootState) =>
    property.features?.seaFront;

export const selectHeatedPool = ({ property }: RootState) =>
    property.features?.heatedPool;

export const selectIndoorPool = ({ property }: RootState) =>
    property.features?.indoorPool;

export const selectOrganizedGarden = ({ property }: RootState) =>
    property.features?.organizedGarden;

export const selectWell = ({ property }: RootState) => property.features?.well;

export const selectDrilling = ({ property }: RootState) =>
    property.features?.drilling;

export const selectMasonryFence = ({ property }: RootState) =>
    property.features?.masonryFence;

export const selectAccessForDisabled = ({ property }: RootState) =>
    property.features?.accessForDisabled;

export const selectIndependentHeatingPerRoom = ({ property }: RootState) =>
    property.features?.independentHeatingPerRoom;

export const selectAdaptingToTheGround = ({ property }: RootState) =>
    property.features?.adaptingToTheGround;

export const selectView = ({ property }: RootState) => property.features?.view;

export const selectFacade = ({ property }: RootState) =>
    property.features?.facade;

export const selectCorner = ({ property }: RootState) =>
    property.features?.corner;

export const selectVeranda = ({ property }: RootState) =>
    property.features?.veranda;

export const selectTents = ({ property }: RootState) =>
    property.features?.tents;

export const selectWithinResidentialZone = ({ property }: RootState) =>
    property.features?.withinResidentialZone;

export const selectWithinCityPlan = ({ property }: RootState) =>
    property.features?.withinCityPlan;

export const selectWalkableDistanceToBeach = ({ property }: RootState) =>
    property.features?.walkableDistanceToBeach;

export const selectLoadingDock = ({ property }: RootState) =>
    property.features?.loadingDock;

export const selectLabelIDs = ({ property }: RootState) => property.labelIDs;

export const { reducer } = slice;
