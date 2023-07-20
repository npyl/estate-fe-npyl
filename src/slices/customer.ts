import { createSlice } from "@reduxjs/toolkit";
import { ICustomerPOST } from "src/types/customer";
import { ILabel } from "src/types/label";
import type { RootState } from "../store";
import { IDemand, IDemandFilters } from "src/types/demand";
import { IPropertyFeatures } from "src/types/features";

interface customerState extends ICustomerPOST {}

interface IFeatureKey {
	key: keyof IPropertyFeatures;
}

const initialState: customerState = {
	id: undefined,
	firstName: "",
	lastName: "",
	email: "",
	mobilePhone: "",
	homePhone: "",
	managedBy: 1,
	status: 0,
	fax: "",
	nationality: "",
	idNumber: "",
	passportNumber: "",
	dateOfBirth: "",
	leadSource: "",
	preferredLanguage: "",
	suggestedBy: "",
	leaser: false,
	lessor: false,
	seller: false,
	buyer: false,
	location: {
		street: "",
		number: "",
		zipCode: 0,
		city: "",
		region: "",
		country: "",
	},
	ownedProperties: [],
	labelIDs: [],
	demand: {
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
		timeframe: "",
	},
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
		removeLabel(state: customerState, { payload }): void {
			// INFO: removes based on array index (contrary to addLabelID)
			const index = payload;
			state.labelIDs = state.labelIDs.filter((_, i) => i !== index);
		},

		setSuggestedBy(state: customerState, action): void {
			state.suggestedBy = action.payload;
		},

		setStreet(state: customerState, action): void {
			state.location.street = action.payload;
		},
		setNumber(state: customerState, action): void {
			state.location.number = action.payload;
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

		// priority features
		setPriorityFeature(state: customerState, action): void {
			const feature: IFeatureKey = action.payload;
			const { key } = feature;
			if (!key) return;
			state.demand.priorityFeatures[key] =
				state.demand.priorityFeatures[key] !== null
					? !state.demand.priorityFeatures[key]
					: true;
		},
		// non-priority features
		setNonPriorityFeature(state: customerState, action): void {
			const feature: IFeatureKey = action.payload;
			const { key } = feature;
			if (!key) return;
			state.demand.nonPriorityFeatures[key] =
				state.demand.nonPriorityFeatures[key] !== null
					? !state.demand.nonPriorityFeatures[key]
					: true;
		},

		// DEMAND
		setMinBedrooms(state: customerState, action): void {
			state.demand.filters.minBedrooms = action.payload;
		},

		setMaxBedrooms(state: customerState, action): void {
			state.demand.filters.maxBedrooms = action.payload;
		},

		setMinBathrooms(state: customerState, action): void {
			state.demand.filters.minBathrooms = action.payload;
		},

		setMaxBathrooms(state: customerState, action): void {
			state.demand.filters.maxBathrooms = action.payload;
		},

		setFurnished(state: customerState, action): void {
			state.demand.filters.furnished = action.payload;
		},

		setMaxCovered(state: customerState, action): void {
			state.demand.filters.maxCovered = action.payload;
		},

		setMinCovered(state: customerState, action): void {
			state.demand.filters.minCovered = action.payload;
		},

		setMinPlot(state: customerState, action): void {
			state.demand.filters.minPlot = action.payload;
		},

		setMaxPlot(state: customerState, action): void {
			state.demand.filters.maxPlot = action.payload;
		},

		setMinYearOfConstruction(state: customerState, action): void {
			state.demand.filters.minYearOfConstruction = action.payload;
		},

		setMaxYearOfConstruction(state: customerState, action): void {
			state.demand.filters.maxYearOfConstruction = action.payload;
		},

		setMinFloor(state: customerState, action): void {
			state.demand.filters.minFloor = action.payload;
		},

		setMaxFloor(state: customerState, action): void {
			state.demand.filters.maxFloor = action.payload;
		},

		setParentCategory(state: customerState, action): void {
			state.demand.filters.parentCategory = action.payload;
		},

		setState(state: customerState, action): void {
			state.demand.filters.state = action.payload;
		},

		setMinPrice(state: customerState, action): void {
			state.demand.filters.minPrice = action.payload;
		},

		setMaxPrice(state: customerState, action): void {
			state.demand.filters.maxPrice = action.payload;
		},

		setDemandLabels(state: customerState, action): void {
			const labels: ILabel[] = action.payload;

			state.demand.filters.labels = labels
				? labels
						.filter((label) => label.id) // where id not null
						.map((label) => {
							return label.id!;
						})
				: [];
		},

		setTimeFrame(state: customerState, action): void {
			state.demand.timeframe = action.payload;
		},

		setInitialState: (state: customerState, action): void => {
			state.leaser = action.payload.leaser;
			state.lessor = action.payload.lessor;
			state.seller = action.payload.seller;
			state.buyer = action.payload.buyer;

			state.id = action.payload.id;
			state.suggestedBy = action.payload.suggestedBy;
			state.managedBy = action.payload.id;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.email = action.payload.email;
			state.mobilePhone = action.payload.mobilePhone;
			state.homePhone = action.payload.homePhone;
			state.status = action.payload.status;
			state.fax = action.payload.fax;
			state.nationality = action.payload.nationality;
			state.idNumber = action.payload.idNumber;
			state.passportNumber = action.payload.passportNumber;
			state.dateOfBirth = action.payload.dateOfBirth;
			state.leadSource = action.payload.leadSource;
			state.preferredLanguage = action.payload.preferredLanguage;

			state.location.street = action.payload.location.street;
			state.location.number = action.payload.location.number;
			state.location.zipCode = action.payload.location.zipCode;
			state.location.city = action.payload.location.city;
			state.location.region = action.payload.location.region;
			state.location.country = action.payload.location.country;

			// labels
			const labels: ILabel[] = action.payload.labels;
			state.labelIDs = labels
				? labels
						.filter((label) => label.id) // where id not null
						.map((label) => {
							return label.id!;
						})
				: [];

			const demand: IDemand = action.payload.demand;
			const demandFilters: IDemandFilters = demand.filters;

			state.demand.filters.minBedrooms = demandFilters.minBedrooms;
			state.demand.filters.maxBedrooms = demandFilters.maxBedrooms;
			state.demand.filters.minBathrooms = demandFilters.minBathrooms;
			state.demand.filters.maxBathrooms = demandFilters.maxBathrooms;
			state.demand.filters.furnished = demandFilters.furnished;
			state.demand.filters.maxCovered = demandFilters.maxCovered;
			state.demand.filters.minCovered = demandFilters.minCovered;
			state.demand.filters.minPlot = demandFilters.minPlot;
			state.demand.filters.maxPlot = demandFilters.maxPlot;
			state.demand.filters.minFloor = demandFilters.minFloor;
			state.demand.filters.maxFloor = demandFilters.maxFloor;
			state.demand.filters.minYearOfConstruction =
				demandFilters.minYearOfConstruction;
			state.demand.filters.maxYearOfConstruction =
				demandFilters.maxYearOfConstruction;

			state.demand.filters.parentCategory = demandFilters.parentCategory;
			state.demand.filters.category = demandFilters.category;
			state.demand.filters.state = demandFilters.state;
			state.demand.filters.minPrice = demandFilters.minPrice;
			state.demand.filters.maxPrice = demandFilters.maxPrice;
			state.demand.filters.labels = demandFilters.labels;
			state.demand.nonPriorityFeatures = demand.nonPriorityFeatures;
			state.demand.priorityFeatures = demand.priorityFeatures;
			state.demand.timeframe = demand.timeframe;
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
	setCity,
	setZipCode,
	setRegion,
	setCountry,

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
	setState,
	setMinPrice,
	setMaxPrice,
	setDemandLabels,
	setTimeFrame,

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
export const selectDemand = ({ customer }: RootState) => customer.demand;

// Location
export const selectStreet = ({ customer }: RootState) =>
	customer.location.street;
export const selectNumber = ({ customer }: RootState) =>
	customer.location.number;
export const selectCity = ({ customer }: RootState) => customer.location.city;
export const selectZipCode = ({ customer }: RootState) =>
	customer.location.zipCode;
export const selectRegion = ({ customer }: RootState) =>
	customer.location.region;
export const selectCountry = ({ customer }: RootState) =>
	customer.location.country;

// Priority Features
export const selectPriorityFeatures = ({ customer }: RootState) =>
	customer.demand.priorityFeatures;
// Non-priority Features
export const selectNonPriorityFeatures = ({ customer }: RootState) =>
	customer.demand.nonPriorityFeatures;

// Demand
export const selectMinBedrooms = ({ customer }: RootState) =>
	customer.demand.filters.minBedrooms;

export const selectMaxBedrooms = ({ customer }: RootState) =>
	customer.demand.filters.maxBedrooms;

export const selectMinBathrooms = ({ customer }: RootState) =>
	customer.demand.filters.minBathrooms;

export const selectMaxBathrooms = ({ customer }: RootState) =>
	customer.demand.filters.maxBathrooms;

export const selectFurnished = ({ customer }: RootState) =>
	customer.demand.filters.furnished;

export const selectMaxCovered = ({ customer }: RootState) =>
	customer.demand.filters.maxCovered;

export const selectMinCovered = ({ customer }: RootState) =>
	customer.demand.filters.minCovered;

export const selectMinPlot = ({ customer }: RootState) =>
	customer.demand.filters.minPlot;

export const selectMaxPlot = ({ customer }: RootState) =>
	customer.demand.filters.maxPlot;

export const selectMinYearOfConstruction = ({ customer }: RootState) =>
	customer.demand.filters.minYearOfConstruction;

export const selectMaxYearOfConstruction = ({ customer }: RootState) =>
	customer.demand.filters.maxYearOfConstruction;

export const selectMinFloor = ({ customer }: RootState) =>
	customer.demand.filters.minFloor;

export const selectMaxFloor = ({ customer }: RootState) =>
	customer.demand.filters.maxFloor;

export const selectParentCategory = ({ customer }: RootState) =>
	customer.demand.filters.parentCategory;

export const selectState = ({ customer }: RootState) =>
	customer.demand.filters.state;

export const selectMinPrice = ({ customer }: RootState) =>
	customer.demand.filters.minPrice;

export const selectMaxPrice = ({ customer }: RootState) =>
	customer.demand.filters.maxPrice;

export const selectDemandLabels = ({ customer }: RootState) =>
	customer.demand.filters.labels;

export const selectTimeFrame = ({ customer }: RootState) =>
	customer.demand.timeframe;

export const { reducer } = slice;
