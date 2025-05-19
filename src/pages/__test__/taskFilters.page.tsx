import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FiltersProvider, useFiltersContext } from "@/sections/Tasks/filters";
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
        setSearch,
        setAssigneeId,
        setLabels,
        setPriority,
        setSorting,
    } = useFiltersContext();

    const { search, assigneeId, labels, priority, sorting } = filters || {};

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

    const handleResetFilters = () => {
        setSearch("");
        setAssigneeId(undefined);
        setPriority(undefined);
        setLabels([]);
        setSorting(undefined);
    };

    return (
        <div data-testid="filter-component">
            <h1>Filter Test Component</h1>

            <section className="actions">
                <h2>Search</h2>
                <button
                    data-testid="set-search"
                    onClick={() => setSearch("test search")}
                >
                    Set Search
                </button>
                <button
                    data-testid="clear-search"
                    onClick={() => setSearch("")}
                >
                    Clear Search
                </button>

                <h2>Assignee</h2>
                <button
                    data-testid="set-assignee"
                    onClick={() => setAssigneeId(123)}
                >
                    Set Assignee
                </button>
                <button
                    data-testid="clear-assignee"
                    onClick={() => setAssigneeId(undefined)}
                >
                    Clear Assignee
                </button>

                <h2>Priority</h2>
                <button
                    data-testid="set-priority"
                    onClick={() => setPriority(2)}
                >
                    Set Priority
                </button>
                <button
                    data-testid="clear-priority"
                    onClick={() => setPriority(undefined)}
                >
                    Clear Priority
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

                <h2>Sorting</h2>
                <button
                    data-testid="sort-by-created-asc"
                    onClick={() =>
                        setSorting({ sortBy: "createdAt", direction: "ASC" })
                    }
                >
                    Sort by Created (Asc)
                </button>
                <button
                    data-testid="sort-by-created-desc"
                    onClick={() =>
                        setSorting({ sortBy: "createdAt", direction: "ASC" })
                    }
                >
                    Sort by Created (Desc)
                </button>
                <button
                    data-testid="sort-by-priority-asc"
                    onClick={() =>
                        setSorting({ sortBy: "priority", direction: "ASC" })
                    }
                >
                    Sort by Priority (Asc)
                </button>
                <button
                    data-testid="sort-by-priority-desc"
                    onClick={() =>
                        setSorting({ sortBy: "priority", direction: "DESC" })
                    }
                >
                    Sort by Priority (Desc)
                </button>

                <h2>Reset</h2>
                <button
                    data-testid="reset-filters"
                    onClick={handleResetFilters}
                >
                    Reset All Filters
                </button>
            </section>

            <section className="state">
                <h2>Current State</h2>
                <div data-testid="current-state" className="state-display">
                    <pre>
                        {JSON.stringify(
                            {
                                search,
                                assigneeId,
                                labels,
                                priority,
                                sorting,
                            },
                            null,
                            2
                        )}
                    </pre>
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
