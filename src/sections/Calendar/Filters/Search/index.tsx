import { useCallback, useRef, useState } from "react";
import { useSearchEventsQuery } from "@/services/calendar";
import { useAuth } from "@/sections/use-auth";
import PoppingSearch from "@/components/PoppingSearch";
import dynamic from "next/dynamic";
import { useFiltersContext } from "../context";
import useEventWatchAndClick from "./useEventWatchAndClick";
import { CALENDAR_SEARCH_TESTID } from "./constants";
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

    const { onWaitEventAndClick, EventWatcher } = useEventWatchAndClick();

    return (
        <>
            <PoppingSearch
                data-testid={CALENDAR_SEARCH_TESTID}
                ref={anchorRef}
                // ...
                value={query}
                onChange={setQuery}
                onClear={handleClear}
            />

            {EventWatcher}

            {haveEvents && anchorRef.current && query ? (
                <Popover
                    anchorEl={anchorRef.current}
                    events={data}
                    onWaitEventAndClick={onWaitEventAndClick}
                    onClose={handleClear}
                />
            ) : null}
        </>
    );
};

export default Search;
