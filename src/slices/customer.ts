import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICustomer, ICustomerPOST } from "src/types/customer";
import {
    IDemand,
    IDemandFilters,
    IDemandFiltersPOST,
    IDemandPOST,
} from "src/types/demand";
import { IPropertyFeatures } from "src/types/features";
import { ILabel } from "src/types/label";
import type { RootState } from "../store";

interface customerState extends ICustomerPOST {}

interface ISetFeatureAction {
    payload: {
        index: number;
        key: keyof IPropertyFeatures;
    };
}
export interface ISetDemandFilterAction {
    payload: {
        index: number;
        value: any;
    };
}

const initialDemandState: IDemandPOST = {
    filters: {
        labels: [],
    },
    priorityFeatures: {
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
    nonPriorityFeatures: {
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
    shapes: [],
};

const initialState: customerState = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    homePhone: "",
    status: 0,
    fax: "",
    idNumber: "",
    passportNumber: "",
    dateOfBirth: "",
    suggestedBy: "",
    leaser: false,
    lessor: false,
    seller: false,
    buyer: false,
    location: {
        street: "",
        number: "",
        complex: "",
        city: "",
        region: "",
        country: "",
    },
    ownedProperties: [],
    labelIDs: [],
    demands: [initialDemandState],
};

const slice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        toggleLeaser(state: customerState, { payload }): void {
            state.leaser = !state.leaser;
        },
        toggleLessor(state: customerState, { payload }): void {
            state.lessor = !state.lessor;
        },
        toggleSeller(state: customerState, { payload }): void {
            state.seller = !state.seller;
        },
        toggleBuyer(state: customerState, { payload }): void {
            state.buyer = !state.buyer;
        },

        setId(state: customerState, action): void {
            state.id = action.payload;
        },

        setFirstName(state: customerState, action): void {
            state.firstName = action.payload;
        },
        setLastName(state: customerState, action): void {
            state.lastName = action.payload;
        },
        setEmail(state: customerState, action): void {
            state.email = action.payload;
        },
        setMobilePhone(state: customerState, action): void {
            state.mobilePhone = action.payload;
        },
        setHomePhone(state: customerState, action): void {
            state.homePhone = action.payload;
        },

        setManagedBy(state: customerState, action): void {
            state.managedBy = action.payload;
        },

        setStatus(state: customerState, action): void {
            state.status = action.payload;
        },
        setFax(state: customerState, action): void {
            state.fax = action.payload;
        },
        setNationality(state: customerState, action): void {
            state.nationality = action.payload;
        },
        setIdNumber(state: customerState, action): void {
            state.idNumber = action.payload;
        },
        setPassportNumber(state: customerState, action): void {
            state.passportNumber = action.payload;
        },
        setDateOfBirth(state: customerState, action): void {
            state.dateOfBirth = action.payload;
        },
        setLeadSource(state: customerState, action): void {
            state.leadSource = action.payload;
        },
        setPreferredLanguage(state: customerState, action): void {
            state.preferredLanguage = action.payload;
        },

        addLabelID(state: customerState, { payload }): void {
            if (!state.labelIDs.includes(payload)) state.labelIDs.push(payload);
        },
        setDemands(state: customerState, { payload }): void {
            if (!state.demands.includes(payload)) state.demands.push(payload);
        },
        removeDemands(state: customerState, { payload }): void {
            // INFO: removes based on array index (contrary to addLabelID)
            const index = payload;
            state.demands = state.demands.filter((_, i) => i !== index);
        },
        removeLabel(state: customerState, { payload }): void {
            // INFO: removes based on array index (contrary to addLabelID)
            const index = payload;
            state.labelIDs = state.labelIDs.filter((_, i) => i !== index);
        },

        setSuggestedBy(state: customerState, action): void {
            state.suggestedBy = action.payload;
        },

        // Location
        setStreet(state: customerState, action): void {
            state.location.street = action.payload;
        },
        setNumber(state: customerState, action): void {
            state.location.number = action.payload;
        },
        setComplex(state: customerState, action): void {
            state.location.complex = action.payload;
        },
        setCity(state: customerState, action): void {
            state.location.city = action.payload;
        },
        setZipCode(state: customerState, action): void {
            state.location.zipCode = action.payload;
        },
        setRegion(state: customerState, action): void {
            state.location.region = action.payload;
        },
        setCountry(state: customerState, action): void {
            state.location.country = action.payload;
        },
        setLatitude(state: customerState, action): void {
            state.location.lat = action.payload;
        },
        setLongitude(state: customerState, action): void {
            state.location.lng = action.payload;
        },

        // priority features
        setPriorityFeature(
            state: customerState,
            action: ISetFeatureAction
        ): void {
            const { index, key } = action.payload;
            if (state.demands[index] === undefined) return;
            state.demands[index].priorityFeatures[key] =
                state.demands[index].priorityFeatures[key] !== null
                    ? !state.demands[index].priorityFeatures[key]
                    : true;
        },

        // non-priority features
        setNonPriorityFeature(
            state: customerState,
            action: ISetFeatureAction
        ): void {
            const { index, key } = action.payload;
            if (state.demands[index] === undefined) return;
            state.demands[index].nonPriorityFeatures[key] =
                state.demands[index].nonPriorityFeatures[key] !== null
                    ? !state.demands[index].nonPriorityFeatures[key]
                    : true;
        },

        // DEMAND
        setMinBedrooms(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minBedrooms = value;
            }
        },

        setMaxBedrooms(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxBedrooms = value;
            }
        },
        setMinBathrooms(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minBathrooms = value;
            }
        },

        setMaxBathrooms(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxBathrooms = value;
            }
        },

        setFurnished(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.furnished = value;
            }
        },

        setMaxCovered(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxCovered = value;
            }
        },

        setMinCovered(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minCovered = value;
            }
        },

        setMinPlot(state: customerState, action: ISetDemandFilterAction): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minPlot = value;
            }
        },

        setMaxPlot(state: customerState, action: ISetDemandFilterAction): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxPlot = value;
            }
        },

        setMinYearOfConstruction(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minYearOfConstruction = value;
            }
        },

        setMaxYearOfConstruction(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxYearOfConstruction = value;
            }
        },

        setMinFloor(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minFloor = value;
            }
        },

        setMaxFloor(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxFloor = value;
            }
        },

        setParentCategory(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.parentCategories = value;
            }
        },

        setCategory(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.categories = value;
            }
        },

        setState(state: customerState, action: ISetDemandFilterAction): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.states = value;
            }
        },

        setMinPrice(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.minPrice = value;
            }
        },

        setMaxPrice(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.maxPrice = value;
            }
        },

        setDemandLabels(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.labels = value;
            }
        },
        setTimeFrame(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].timeframe = value;
            }
        },

        setShapes(state: customerState, action: ISetDemandFilterAction): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].shapes = value;
            }
        },

        //Demand Location
        setDemandComplexes(state: customerState, action): void {},
        setDemandCities(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.cities = value;
            }
        },

        setDemandRegions(
            state: customerState,
            action: ISetDemandFilterAction
        ): void {
            const { index, value } = action.payload;
            if (state.demands[index]) {
                state.demands[index].filters.regions = value;
            }
        },
        setInitialState: (state: customerState, action): void => {
            const payload: ICustomer = action.payload;
            const initialDemand = initialState.demands[0];

            // Mappers
            const demandFiltersMapper = (
                demandFilters: IDemandFilters
            ): IDemandFiltersPOST => ({
                minBedrooms: demandFilters.minBedrooms,
                maxBedrooms: demandFilters.minBedrooms,
                minBathrooms: demandFilters.minBedrooms,
                maxBathrooms: demandFilters.minBedrooms,
                furnished: demandFilters.furnished.map((i) => i.key),
                maxCovered: demandFilters.maxCovered,
                minCovered: demandFilters.minCovered,
                minPlot: demandFilters.minPlot,
                maxPlot: demandFilters.maxPlot,
                minYearOfConstruction: demandFilters.minYearOfConstruction,
                maxYearOfConstruction: demandFilters.maxYearOfConstruction,
                minFloor: demandFilters.minFloor.key,
                maxFloor: demandFilters.maxFloor.key,
                states: demandFilters.states.map((i) => i.key),
                minPrice: demandFilters.minPrice,
                maxPrice: demandFilters.maxPrice,
                labels: demandFilters.labels,
                cities: demandFilters.cities,
                regions: demandFilters.regions,
                complexes: demandFilters.complexes,
                categories: demandFilters.categories.map((i) => i.key),
                parentCategories: demandFilters.parentCategories.map(
                    (i) => i.key
                ),
            });
            const demandMapper = (demand: IDemand): IDemandPOST => ({
                filters: demandFiltersMapper(demand.filters),
                priorityFeatures: demand.priorityFeatures,
                nonPriorityFeatures: demand.nonPriorityFeatures,
                timeframe: demand.timeframe.key,
                shapes: demand.shapes,
            });

            state.leaser = payload.leaser || initialState.leaser;
            state.lessor = payload.lessor || initialState.lessor;
            state.seller = payload.seller || initialState.seller;
            state.buyer = payload.buyer || initialState.buyer;

            state.id = payload.id || initialState.id;
            state.suggestedBy = payload.suggestedBy || initialState.suggestedBy;
            state.managedBy = payload.managedBy?.id || initialState.managedBy;
            state.firstName = payload.firstName || initialState.firstName;
            state.lastName = payload.lastName || initialState.lastName;
            state.email = payload.email || initialState.email;
            state.mobilePhone = payload.mobilePhone || initialState.mobilePhone;
            state.homePhone = payload.homePhone || initialState.homePhone;
            state.status = payload.status || initialState.status;
            state.fax = payload.fax || initialState.fax;
            state.nationality =
                payload.nationality.key || initialState.nationality;
            state.idNumber = payload.idNumber || initialState.idNumber;
            state.passportNumber =
                payload.passportNumber || initialState.passportNumber;
            state.dateOfBirth = payload.dateOfBirth || initialState.dateOfBirth;
            state.leadSource =
                payload.leadSource.key || initialState.leadSource;
            state.preferredLanguage =
                payload.preferredLanguage.key || initialState.preferredLanguage;

            // location
            state.location.street =
                payload.location?.street || initialState.location.street;
            state.location.number =
                payload.location?.number || initialState.location.number;
            state.location.zipCode =
                payload.location?.zipCode || initialState.location.zipCode;
            state.location.complex =
                payload.location?.complex || initialState.location.complex;
            state.location.city =
                payload.location?.city || initialState.location.city;
            state.location.region =
                payload.location?.region || initialState.location.region;
            state.location.country =
                payload.location?.country || initialState.location.country;
            state.location.lat =
                payload.location?.lat || initialState.location.lat;
            state.location.lng =
                payload.location?.lng || initialState.location.lng;

            // labels
            const labels: ILabel[] = payload.labels;
            state.labelIDs = labels
                ? labels
                      .filter((label) => label.id) // where id not null
                      .map((label) => {
                          return label.id!;
                      })
                : [];

            // Demands
            state.demands = payload.demands.map(
                (demand) => demandMapper(demand) || initialDemand
            );
        },
        addDemand: (state: customerState, action) => {
            state.demands.push(initialDemandState);
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const {
    toggleLeaser,
    toggleLessor,
    toggleSeller,
    toggleBuyer,
    //demands
    removeDemands,

    setDemands,
    addDemand,

    setId,
    setManagedBy,
    setSuggestedBy,
    setFirstName,
    setLastName,
    setEmail,
    setMobilePhone,
    setHomePhone,
    setStatus,
    setFax,
    setNationality,
    setIdNumber,
    setPassportNumber,
    setDateOfBirth,
    setLeadSource,
    setPreferredLanguage,

    // labels
    addLabelID,
    removeLabel,

    // location
    setStreet,
    setNumber,
    setComplex,
    setCity,
    setZipCode,
    setRegion,
    setCountry,
    setLatitude,
    setLongitude,

    // demand
    setMinBedrooms,
    setMaxBedrooms,
    setMinBathrooms,
    setMaxBathrooms,
    setFurnished,
    setMaxCovered,
    setMinCovered,
    setMinPlot,
    setMaxPlot,
    setMinYearOfConstruction,
    setMaxYearOfConstruction,
    setMinFloor,
    setMaxFloor,
    setParentCategory,
    setCategory,
    setState,
    setMinPrice,
    setMaxPrice,
    setDemandLabels,
    setTimeFrame,
    setShapes,
    //Demand Location

    setDemandComplexes,
    setDemandCities,
    setDemandRegions,

    // priority features
    setPriorityFeature,
    // non-priority features
    setNonPriorityFeature,

    setInitialState,
    resetState,
} = slice.actions;

export const selectAll = ({ customer }: RootState) => customer;

export const selectLeaser = ({ customer }: RootState) => customer.leaser;
export const selectLessor = ({ customer }: RootState) => customer.lessor;
export const selectSeller = ({ customer }: RootState) => customer.seller;
export const selectBuyer = ({ customer }: RootState) => customer.buyer;

export const selectFirstName = ({ customer }: RootState) => customer.firstName;
export const selectLastName = ({ customer }: RootState) => customer.lastName;
export const selectEmail = ({ customer }: RootState) => customer.email;
export const selectMobilePhone = ({ customer }: RootState) =>
    customer.mobilePhone;
export const selectHomePhone = ({ customer }: RootState) => customer.homePhone;
export const selectManagedBy = ({ customer }: RootState) => customer.managedBy;
export const selectStatus = ({ customer }: RootState) => customer.status;
export const selectFax = ({ customer }: RootState) => customer.fax;
export const selectNationality = ({ customer }: RootState) =>
    customer.nationality;
export const selectIdNumber = ({ customer }: RootState) => customer.idNumber;
export const selectPassportNumber = ({ customer }: RootState) =>
    customer.passportNumber;
export const selectDateOfBirth = ({ customer }: RootState) =>
    customer.dateOfBirth;
export const selectLeadSource = ({ customer }: RootState) =>
    customer.leadSource;
export const selectPreferredLanguage = ({ customer }: RootState) =>
    customer.preferredLanguage;
export const selectSuggestedBy = ({ customer }: RootState) =>
    customer.suggestedBy;
export const selectLocation = ({ customer }: RootState) => customer.location;
export const selectOwnedProperties = ({ customer }: RootState) =>
    customer.ownedProperties;
export const selectLabelIDs = ({ customer }: RootState) => customer.labelIDs;
export const selectDemands = ({ customer }: RootState) => customer.demands;

// Location
export const selectStreet = ({ customer }: RootState) =>
    customer.location.street;
export const selectNumber = ({ customer }: RootState) =>
    customer.location.number;
export const selectComplex = ({ customer }: RootState) =>
    customer.location.complex;
export const selectCity = ({ customer }: RootState) => customer.location.city;
export const selectZipCode = ({ customer }: RootState) =>
    customer.location.zipCode;
export const selectRegion = ({ customer }: RootState) =>
    customer.location.region;
export const selectCountry = ({ customer }: RootState) =>
    customer.location.country;
export const selectLatitude = ({ customer }: RootState) =>
    customer.location.lat;
export const selectLongitude = ({ customer }: RootState) =>
    customer.location.lng;

// Priority Features
export const selectPriorityFeatures = ({ customer }: RootState) =>
    customer.demands.map((d) => d.priorityFeatures);

export const selectNonPriorityFeatures = ({ customer }: RootState) =>
    customer.demands.map((d) => d.nonPriorityFeatures);

export const selectMinBedrooms = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minBedrooms);

export const selectMaxBedrooms = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxBedrooms);

export const selectMinBathrooms = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minBathrooms);

export const selectMaxBathrooms = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxBathrooms);

export const selectFurnished = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.furnished);

export const selectMaxCovered = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxCovered);

export const selectMinCovered = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minCovered);

export const selectMinPlot = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minPlot);

export const selectMaxPlot = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxPlot);

export const selectMinYearOfConstruction = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minYearOfConstruction);

export const selectMaxYearOfConstruction = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxYearOfConstruction);

export const selectMinFloor = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minFloor);

export const selectMaxFloor = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxFloor);

export const selectParentCategory = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.parentCategories);

export const selectCategory = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.categories);

export const selectState = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.states);

export const selectMinPrice = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.minPrice);

export const selectMaxPrice = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.maxPrice);

export const selectDemandLabels = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.labels);

export const selectTimeFrame = ({ customer }: RootState) =>
    customer.demands.map((d) => d.timeframe);

// array of string-arrays a.k.a. string[][]
export const selectShapes = ({ customer }: RootState) =>
    customer.demands.map((d) => d.shapes);

//Demand Location

export const selectDemandComplexes = ({ customer }: RootState) => []; //here will  do thw complexes
export const selectDemandCities = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.cities);

export const selectDemandRegions = ({ customer }: RootState) =>
    customer.demands.map((d) => d.filters?.regions);

export const { reducer } = slice;
