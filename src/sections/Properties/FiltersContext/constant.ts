import { IFilterProps } from "./types";

const initialState: IFilterProps = {
    filters: {
        locationSearch: undefined,
        managerId: undefined,
        parentCategories: [],
        categories: [],
        labels: [],
        states: [],
        regions: [],
        cities: [],
        points: [],
        frameType: [],
        furnished: [],
        heatingType: [],
        active: null,
        extras: {
            student: false,
            seaFront: false,
            luxury: false,
            mountainView: false,
            neoclassical: false,
            investment: false,
            goldenVisa: false,
        },
        integrationSites: [],
    },
    ids: [],
};

export { initialState };
