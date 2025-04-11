import React from "react";
import useStateMethods from "@/sections/Properties/FiltersContext/useStateMethods";
import useTabState from "@/sections/Properties/FiltersContext/useTabState";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import { NextPage } from "next";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const TestComponent: NextPage = () => {
    const [state, setState] = useTabState();
    const methods = useStateMethods(setState);

    // Helper to display current state as JSON
    const stateAsJson = JSON.stringify(state, null, 2);

    return (
        <div data-testid="filter-component">
            <h1>Filter Test Component</h1>

            <section className="actions">
                <div>
                    <h2>Update Filter</h2>
                    <button
                        data-testid="set-min-price"
                        onClick={() => methods.updateFilter("minPrice", 100000)}
                    >
                        Set Min Price to 100,000
                    </button>

                    <button
                        data-testid="set-max-price"
                        onClick={() => methods.updateFilter("maxPrice", 500000)}
                    >
                        Set Max Price to 500,000
                    </button>

                    <button
                        data-testid="set-min-area"
                        onClick={() => methods.updateFilter("minArea", 50)}
                    >
                        Set Min Area to 50
                    </button>
                </div>

                <div>
                    <h2>Toggle Filter Arrays</h2>
                    <button
                        data-testid="toggle-region-athens"
                        onClick={() =>
                            methods.toggleFilterArray("regions", "Athens")
                        }
                    >
                        Toggle Region Athens
                    </button>

                    <button
                        data-testid="toggle-category-apartment"
                        onClick={() =>
                            methods.toggleFilterArray("categories", "apartment")
                        }
                    >
                        Toggle Category Apartment
                    </button>
                </div>

                <div>
                    <h2>Delete Filter</h2>
                    <button
                        data-testid="delete-min-price"
                        onClick={() => methods.deleteFilter("minPrice")}
                    >
                        Delete Min Price
                    </button>

                    <button
                        data-testid="delete-regions"
                        onClick={() => methods.deleteFilter("regions")}
                    >
                        Delete Regions
                    </button>
                </div>
            </section>

            <section className="state">
                <h2>Current State</h2>
                <div data-testid="current-state" className="state-display">
                    <pre>{stateAsJson}</pre>
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
