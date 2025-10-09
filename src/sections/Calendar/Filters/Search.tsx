import { useCallback, useRef, useState } from "react";
import { useSearchEventsQuery } from "@/services/calendar";
import { useAuth } from "@/sections/use-auth";
import PoppingSearch from "@/components/PoppingSearch";
import dynamic from "next/dynamic";
import { useFiltersContext } from "./context";
const Popover = dynamic(() => import("./Popover"));

// --------------------------------------------------------------------------

const Search = () => {
    const anchorRef = useRef<HTMLInputElement>(null);

    const [query, setQuery] = useState("");

    const { user } = useAuth();
    const { calendarId } = useFiltersContext();
    const { data } = useSearchEventsQuery(
        { userId: user?.id!, query, filters: { calendarId } },
        { skip: !query }
    );

    const haveEvents = data?.length && data?.length > 0;

    const handleClear = useCallback(() => setQuery(""), []);

    return (
        <>
            <PoppingSearch
                ref={anchorRef}
                // ...
                value={query}
                onChange={setQuery}
                onClear={handleClear}
            />

            {haveEvents && anchorRef.current && query ? (
                <Popover
                    anchorEl={anchorRef.current}
                    events={data}
                    onClose={handleClear}
                />
            ) : null}
        </>
    );
};

export default Search;
