import { ICustomerFilter } from "@/types/customer";
import { useCallback } from "react";
import { initialState } from "./constants";

const useSetters = (
    setFilters: React.Dispatch<React.SetStateAction<ICustomerFilter>>,
    setSorting: React.Dispatch<React.SetStateAction<string>>
) => {
    const setStatus = useCallback(
        (status?: number) => setFilters((old) => ({ ...old, status })),
        []
    );

    const setLeaser = useCallback(
        (leaser: boolean) => setFilters((old) => ({ ...old, leaser })),
        []
    );

    const setLessor = useCallback(
        (lessor: boolean) => setFilters((old) => ({ ...old, lessor })),
        []
    );

    const setSeller = useCallback(
        (seller: boolean) => setFilters((old) => ({ ...old, seller })),
        []
    );

    const setBuyer = useCallback(
        (buyer: boolean) => setFilters((old) => ({ ...old, buyer })),
        []
    );

    const setManagerId = useCallback(
        (managerId?: number) => setFilters((old) => ({ ...old, managerId })),
        []
    );

    const setLabels = useCallback(
        (labels: any[]) => setFilters((old) => ({ ...old, labels })),
        []
    );

    const setCategories = useCallback(
        (categories: any[]) => setFilters((old) => ({ ...old, categories })),
        []
    );

    const setParentCategories = useCallback(
        (parentCategories: any[]) =>
            setFilters((old) => ({ ...old, parentCategories })),
        []
    );

    const setMaxPrice = useCallback(
        (maxPrice: any) => setFilters((old) => ({ ...old, maxPrice })),
        []
    );

    const setMinPrice = useCallback(
        (minPrice: any) => setFilters((old) => ({ ...old, minPrice })),
        []
    );

    const setMinArea = useCallback(
        (minCovered: any) => setFilters((old) => ({ ...old, minCovered })),
        []
    );

    const setMaxArea = useCallback(
        (maxCovered: any) => setFilters((old) => ({ ...old, maxCovered })),
        []
    );

    const setStates = useCallback(
        (states: any[]) => setFilters((old) => ({ ...old, states })),
        []
    );

    const setB2B = useCallback(
        (b2b: boolean = false) => setFilters((old) => ({ ...old, b2b })),
        []
    );

    const resetState = useCallback(() => {
        setFilters(initialState.filters);
        setSorting(initialState.sorting);
    }, [setFilters, setSorting]);

    return {
        setStatus,
        setLeaser,
        setLessor,
        setSeller,
        setBuyer,
        setManagerId,
        setLabels,
        setCategories,
        setParentCategories,
        setMaxPrice,
        setMinPrice,
        setMinArea,
        setMaxArea,
        setStates,
        setB2B,
        setSorting,
        resetState,
    };
};

export default useSetters;
