import FiltersBar from "@/components/Filters/FiltersBar";
import From from "./From";
import To from "./To";
import Properties from "./Properties";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";

const Filters = () => (
    <FiltersBar
        filters={
            <IsAuthenticatedGuard>
                <From />
                <To />
                <Properties />
            </IsAuthenticatedGuard>
        }
        bottomContent={<></>}
        controls={<IsAuthenticatedIndicator />}
    />
);

export default Filters;
