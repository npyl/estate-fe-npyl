import FiltersBar from "@/components/Filters/FiltersBar";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";
import ChosenFilters from "./ChosenFilters";
// ...
import Search from "./Items/Search";
import Mailbox from "./Items/Mailbox";
import ManagerId from "./Items/ManagerId";
import From from "./Items/From";
import To from "./Items/To";
import Properties from "./Items/Properties";

const Filters = () => (
    <FiltersBar
        filters={
            <IsAuthenticatedGuard>
                <Search />
                {/* ---- */}
                <ManagerId />
                {/* ---- */}
                <Mailbox />
                <From />
                <To />
                <Properties />
            </IsAuthenticatedGuard>
        }
        bottomContent={<ChosenFilters />}
        controls={<IsAuthenticatedIndicator />}
    />
);

export default Filters;
