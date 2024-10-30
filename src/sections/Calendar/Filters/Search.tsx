import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { ChangeEvent, FC, useRef, useState, forwardRef } from "react";
import useDialog from "@/hooks/useDialog";
import { useDebounce } from "use-debounce";
import { useSearchEventsQuery } from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import MuiPopover from "@mui/material/Popover";
import { TCalendarEvent } from "@/components/Calendar/types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const EventDialog = dynamic(() => import("../Event/View"));

// --------------------------------------------------------------------

const getEvent =
    (onClick: (event: TCalendarEvent) => void) => (event: TCalendarEvent) =>
        <CompactCalendarEvent key={event.id} event={event} onClick={onClick} />;

interface PopoverProps {
    anchorEl: HTMLElement;
    events: TCalendarEvent[];
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, events, onClose }) => {
    const [event, setEvent] = useState<TCalendarEvent>();
    const closeDialog = () => setEvent(undefined);

    return (
        <>
            <MuiPopover
                open
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                onClose={onClose}
            >
                <Stack spacing={1} width="max-content" p={1}>
                    {events.map(getEvent(setEvent))}
                </Stack>
            </MuiPopover>

            {event ? <EventDialog event={event} onClose={closeDialog} /> : null}
        </>
    );
};

// --------------------------------------------------------------------

interface StyledSearchProps extends TextFieldProps<"outlined"> {
    open?: boolean;
}

// Use forwardRef with the styled component
const StyledTextField = styled(TextField)<StyledSearchProps>(({ open }) => ({
    minWidth: open ? "160px" : "50px",
    width: open ? "160px" : "50px",
    transition: "width 0.3s",
}));

// --------------------------------------------------------------------

interface PoppingSearchProps extends StyledSearchProps {
    onOpen: VoidFunction;
    onClear?: VoidFunction;
}

// Use forwardRef for PoppingSearch component
const PoppingSearch = forwardRef<HTMLDivElement, PoppingSearchProps>(
    ({ onOpen, onClear, InputProps, ...props }, ref) => (
        <StyledTextField
            ref={ref}
            {...props}
            InputProps={{
                ...InputProps,
                startAdornment: InputProps?.startAdornment || (
                    <InputAdornment position="start">
                        <IconButton onClick={onOpen}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment:
                    InputProps?.endAdornment || (onClear && props.open) ? (
                        <InputAdornment position="end">
                            <IconButton onClick={onClear}>
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
            }}
        />
    )
);

// --------------------------------------------------------------------------

const Search = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, openSearch, closeSearch] = useDialog();

    const [search, setSearch] = useState("");
    const [query] = useDebounce(search, 500);

    const { user } = useAuth();
    const { data } = useSearchEventsQuery(
        { userId: user?.id!, query },
        { skip: !query }
    );

    const haveEvents = data?.length && data?.length > 0;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    const handleClear = () => {
        setSearch("");
        closeSearch();
    };

    return (
        <>
            <PoppingSearch
                ref={anchorRef}
                // ...
                open={isOpen}
                onOpen={openSearch}
                onClear={handleClear}
                variant="outlined"
                // ...
                value={search}
                onChange={handleSearch}
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
