import FiltersBar from "@/components/Filters/FiltersBar";
import From from "./From";
import To from "./To";
import Properties from "./Properties";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";

const Filters = () => (
    <FiltersBar
        filters={
            <>
                <From />
                <To />
                <Properties />
            </>
        }
        bottomContent={<></>}
        controls={<IsAuthenticatedIndicator />}
    />
);

export default Filters;
