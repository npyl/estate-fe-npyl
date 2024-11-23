import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchEventsQuery } from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import PoppingSearch from "@/components/PoppingSearch";
import dynamic from "next/dynamic";
import { useFiltersContext } from "./context";
const Popover = dynamic(() => import("./Popover"));

// --------------------------------------------------------------------------

const Search = () => {
    const anchorRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState("");
    const [query] = useDebounce(search, 100);

    const { user } = useAuth();
    const { calendarId } = useFiltersContext();
    const { data } = useSearchEventsQuery(
        { userId: user?.id!, query, filters: { calendarId } },
        { skip: !query }
    );

    const haveEvents = data?.length && data?.length > 0;

    const handleSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    );

    const handleClear = useCallback(() => setSearch(""), []);

    return (
        <>
            <PoppingSearch
                ref={anchorRef}
                // ...
                value={search}
                onChange={handleSearch}
                onClear={handleClear}
            />

            {haveEvents && anchorRef.current && search ? (
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
