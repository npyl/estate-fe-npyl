import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";
import States from "./Filters/States";
import ParentCategories from "./Filters/ParentCategories";
import Labels from "./Filters/Labels";
import Categories from "./Filters/Categories";
import PriceAndArea from "./Filters/PriceAndArea";
import Status from "./Filters/Status";
import SortBy from "./Filters/SortBy";
import B2B from "./Filters/B2B";
import ManagerId from "./Filters/ManagerId";

const Tester = () => {
    const { filters, sorting, resetState } = useFiltersContext();

    return (
        <div data-testid="filter-component">
            <section className="actions">
                <Status />

                <B2B />

                <ManagerId />

                <PriceAndArea />

                <Labels />

                <Categories />

                <ParentCategories />

                <States />

                <SortBy />

                <button data-testid="reset-all-filters" onClick={resetState} />
            </section>

            <section className="state">
                <div data-testid="current-state" className="state-display">
                    <pre>{JSON.stringify({ filters, sorting }, null, 2)}</pre>
                </div>
            </section>
        </div>
    );
};

export default Tester;
