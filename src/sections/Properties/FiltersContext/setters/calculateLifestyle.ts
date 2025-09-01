import { IFilterProps } from "@/sections/Properties/FiltersContext/types";
import { IPropertyFilterExtras } from "@/types/properties";

const calculateLifestyle =
    (key: keyof IPropertyFilterExtras) => (prevState: IFilterProps) => {
        // Check if the key exists in extras
        if (prevState.filters.extras.hasOwnProperty(key)) {
            // Create a completely new state object with nested structure
            const newFilters = {
                ...prevState.filters,
                extras: {
                    ...prevState.filters.extras,
                    [key]: !prevState.filters.extras[key],
                },
            };

            // Determine if any extras are active after the toggle
            const anyExtrasActive = Object.values(newFilters.extras).some((v) =>
                Boolean(v)
            );

            // Create a new IDs array based on extras status
            let newIds;
            if (anyExtrasActive && !prevState.ids.includes("extras")) {
                newIds = [...prevState.ids, "extras"];
            } else if (!anyExtrasActive && prevState.ids.includes("extras")) {
                newIds = prevState.ids.filter((id) => id !== "extras");
            } else {
                newIds = [...prevState.ids]; // Create a new array but with same content
            }

            // Return completely new state object
            return {
                ...prevState,
                filters: newFilters,
                ids: newIds,
            };
        }

        // If key doesn't exist, return the previous state (but as a new object to be safe)
        return { ...prevState };
    };

export default calculateLifestyle;
