import AuthGuard from "@/components/authentication/auth-guard";
import {
    FiltersProvider,
    useFiltersContext,
} from "@/sections/Customer/ViewAll/(FilterSection)/Context";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { NextPage } from "next";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const TestComponent: NextPage = () => {
    const {
        filters,
        sorting,
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
        setSorting,
        deleteFilter,
        resetState,
    } = useFiltersContext();

    const { labels, categories, parentCategories, states } = filters || {};

    // Label handlers
    const handleAddLabel = (labelId: number) => {
        const updatedLabels = [...(labels || []), labelId];
        setLabels(updatedLabels);
    };

    const handleRemoveLabel = (labelId: number) => {
        const updatedLabels = (labels || []).filter((id) => id !== labelId);
        setLabels(updatedLabels);
    };

    const handleClearLabels = () => {
        setLabels([]);
    };

    // Category handlers
    const handleAddCategory = (category: string) => {
        const updatedCategories = [...(categories || []), category];
        setCategories(updatedCategories);
    };

    const handleRemoveCategory = (category: string) => {
        const updatedCategories = (categories || []).filter(
            (cat) => cat !== category
        );
        setCategories(updatedCategories);
    };

    const handleClearCategories = () => {
        setCategories([]);
    };

    // Parent category handlers
    const handleAddParentCategory = (parentCategory: string) => {
        const updatedParentCategories = [
            ...(parentCategories || []),
            parentCategory,
        ];
        setParentCategories(updatedParentCategories);
    };

    const handleRemoveParentCategory = (parentCategory: string) => {
        const updatedParentCategories = (parentCategories || []).filter(
            (cat) => cat !== parentCategory
        );
        setParentCategories(updatedParentCategories);
    };

    const handleClearParentCategories = () => {
        setParentCategories([]);
    };

    // State handlers
    const handleAddState = (state: string) => {
        const updatedStates = [...(states || []), state];
        setStates(updatedStates);
    };

    const handleRemoveState = (state: string) => {
        const updatedStates = (states || []).filter((s: string) => s !== state);
        setStates(updatedStates);
    };

    const handleClearStates = () => {
        setStates([]);
    };

    return (
        <div data-testid="filter-component">
            <h1>Customer Filter Test Component</h1>

            <section className="actions">
                <h2>Status</h2>
                <button data-testid="set-status" onClick={() => setStatus(1)}>
                    Set Status (1)
                </button>
                <button
                    data-testid="clear-status"
                    onClick={() => setStatus(undefined)}
                >
                    Clear Status
                </button>

                <h2>Role Filters</h2>
                <button
                    data-testid="set-leaser"
                    onClick={() => setLeaser(true)}
                >
                    Set Leaser
                </button>
                <button
                    data-testid="clear-leaser"
                    onClick={() => setLeaser(false)}
                >
                    Clear Leaser
                </button>
                <button
                    data-testid="set-lessor"
                    onClick={() => setLessor(true)}
                >
                    Set Lessor
                </button>
                <button
                    data-testid="clear-lessor"
                    onClick={() => setLessor(false)}
                >
                    Clear Lessor
                </button>
                <button
                    data-testid="set-seller"
                    onClick={() => setSeller(true)}
                >
                    Set Seller
                </button>
                <button
                    data-testid="clear-seller"
                    onClick={() => setSeller(false)}
                >
                    Clear Seller
                </button>
                <button data-testid="set-buyer" onClick={() => setBuyer(true)}>
                    Set Buyer
                </button>
                <button
                    data-testid="clear-buyer"
                    onClick={() => setBuyer(false)}
                >
                    Clear Buyer
                </button>

                <h2>B2B Filter</h2>
                <button
                    data-testid="set-b2b"
                    onClick={() => {
                        // Assuming b2b is handled through a setter similar to other boolean filters
                        // You may need to add this to your context if it doesn't exist
                    }}
                >
                    Set B2B
                </button>
                <button
                    data-testid="clear-b2b"
                    onClick={() => {
                        // Clear B2B
                    }}
                >
                    Clear B2B
                </button>

                <h2>Manager</h2>
                <button
                    data-testid="set-manager"
                    onClick={() => setManagerId(123)}
                >
                    Set Manager (123)
                </button>
                <button
                    data-testid="clear-manager"
                    onClick={() => setManagerId(undefined)}
                >
                    Clear Manager
                </button>

                <h2>Price Filters</h2>
                <button
                    data-testid="set-min-price"
                    onClick={() => setMinPrice(100000)}
                >
                    Set Min Price (100k)
                </button>
                <button
                    data-testid="set-max-price"
                    onClick={() => setMaxPrice(500000)}
                >
                    Set Max Price (500k)
                </button>
                <button
                    data-testid="set-high-min-price"
                    onClick={() => setMinPrice(600000)}
                >
                    Set High Min Price (600k)
                </button>
                <button
                    data-testid="clear-min-price"
                    onClick={() => setMinPrice(undefined)}
                >
                    Clear Min Price
                </button>
                <button
                    data-testid="clear-max-price"
                    onClick={() => setMaxPrice(undefined)}
                >
                    Clear Max Price
                </button>

                <h2>Area Filters</h2>
                <button
                    data-testid="set-min-area"
                    onClick={() => setMinArea(50)}
                >
                    Set Min Area (50)
                </button>
                <button
                    data-testid="set-max-area"
                    onClick={() => setMaxArea(200)}
                >
                    Set Max Area (200)
                </button>
                <button
                    data-testid="set-high-min-area"
                    onClick={() => setMinArea(250)}
                >
                    Set High Min Area (250)
                </button>
                <button
                    data-testid="clear-min-area"
                    onClick={() => setMinArea(undefined)}
                >
                    Clear Min Area
                </button>
                <button
                    data-testid="clear-max-area"
                    onClick={() => setMaxArea(undefined)}
                >
                    Clear Max Area
                </button>

                <h2>Labels</h2>
                <button
                    data-testid="add-label-1"
                    onClick={() => handleAddLabel(1)}
                >
                    Add Label 1
                </button>
                <button
                    data-testid="add-label-2"
                    onClick={() => handleAddLabel(2)}
                >
                    Add Label 2
                </button>
                <button
                    data-testid="add-label-3"
                    onClick={() => handleAddLabel(3)}
                >
                    Add Label 3
                </button>
                <button
                    data-testid="remove-label-1"
                    onClick={() => handleRemoveLabel(1)}
                >
                    Remove Label 1
                </button>
                <button
                    data-testid="remove-label-2"
                    onClick={() => handleRemoveLabel(2)}
                >
                    Remove Label 2
                </button>
                <button
                    data-testid="remove-label-3"
                    onClick={() => handleRemoveLabel(3)}
                >
                    Remove Label 3
                </button>
                <button data-testid="clear-labels" onClick={handleClearLabels}>
                    Clear All Labels
                </button>

                <h2>Categories</h2>
                <button
                    data-testid="add-category-residential"
                    onClick={() => handleAddCategory("residential")}
                >
                    Add Residential
                </button>
                <button
                    data-testid="add-category-commercial"
                    onClick={() => handleAddCategory("commercial")}
                >
                    Add Commercial
                </button>
                <button
                    data-testid="remove-category-residential"
                    onClick={() => handleRemoveCategory("residential")}
                >
                    Remove Residential
                </button>
                <button
                    data-testid="remove-category-commercial"
                    onClick={() => handleRemoveCategory("commercial")}
                >
                    Remove Commercial
                </button>
                <button
                    data-testid="clear-categories"
                    onClick={handleClearCategories}
                >
                    Clear All Categories
                </button>

                <h2>Parent Categories</h2>
                <button
                    data-testid="add-parent-category-sale"
                    onClick={() => handleAddParentCategory("sale")}
                >
                    Add Sale
                </button>
                <button
                    data-testid="add-parent-category-rent"
                    onClick={() => handleAddParentCategory("rent")}
                >
                    Add Rent
                </button>
                <button
                    data-testid="remove-parent-category-sale"
                    onClick={() => handleRemoveParentCategory("sale")}
                >
                    Remove Sale
                </button>
                <button
                    data-testid="remove-parent-category-rent"
                    onClick={() => handleRemoveParentCategory("rent")}
                >
                    Remove Rent
                </button>
                <button
                    data-testid="clear-parent-categories"
                    onClick={handleClearParentCategories}
                >
                    Clear All Parent Categories
                </button>

                <h2>States</h2>
                <button
                    data-testid="add-state-active"
                    onClick={() => handleAddState("active")}
                >
                    Add Active
                </button>
                <button
                    data-testid="add-state-inactive"
                    onClick={() => handleAddState("inactive")}
                >
                    Add Inactive
                </button>
                <button
                    data-testid="remove-state-active"
                    onClick={() => handleRemoveState("active")}
                >
                    Remove Active
                </button>
                <button
                    data-testid="remove-state-inactive"
                    onClick={() => handleRemoveState("inactive")}
                >
                    Remove Inactive
                </button>
                <button data-testid="clear-states" onClick={handleClearStates}>
                    Clear All States
                </button>

                <h2>Sorting</h2>
                <button
                    data-testid="sort-name-asc"
                    onClick={() => setSorting("name-asc")}
                >
                    Sort by Name (Asc)
                </button>
                <button
                    data-testid="sort-created-desc"
                    onClick={() => setSorting("created-desc")}
                >
                    Sort by Created (Desc)
                </button>
                <button
                    data-testid="sort-default"
                    onClick={() => setSorting("default")}
                >
                    Default Sort
                </button>

                <h2>Delete Individual Filters</h2>
                <button
                    data-testid="delete-status-filter"
                    onClick={() => deleteFilter("status")}
                >
                    Delete Status Filter
                </button>
                <button
                    data-testid="delete-minPrice-filter"
                    onClick={() => deleteFilter("minPrice")}
                >
                    Delete Min Price Filter
                </button>
                <button
                    data-testid="delete-maxPrice-filter"
                    onClick={() => deleteFilter("maxPrice")}
                >
                    Delete Max Price Filter
                </button>
                <button
                    data-testid="delete-managerId-filter"
                    onClick={() => deleteFilter("managerId")}
                >
                    Delete Manager Filter
                </button>
                <button
                    data-testid="delete-labels-filter"
                    onClick={() => deleteFilter("labels")}
                >
                    Delete Labels Filter
                </button>

                <h2>Reset</h2>
                <button data-testid="reset-all-filters" onClick={resetState}>
                    Reset All Filters
                </button>
            </section>

            <section className="state">
                <h2>Current State</h2>
                <div data-testid="current-state" className="state-display">
                    <pre>{JSON.stringify({ filters, sorting }, null, 2)}</pre>
                </div>
            </section>
        </div>
    );
};

TestComponent.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default TestComponent;
