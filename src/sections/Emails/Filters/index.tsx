import FiltersBar from "@/components/Filters/FiltersBar";
import From from "./From";
import To from "./To";
import Properties from "./Properties";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";
import ChosenFilters from "./ChosenFilters";
import Search from "./Search";
import Mailbox from "./Mailbox";
import ManagerId from "./ManagerId";

const Filters = () => (
    <FiltersBar
        filters={
            <IsAuthenticatedGuard>
                <Search />
                <Mailbox />
                <ManagerId />
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
