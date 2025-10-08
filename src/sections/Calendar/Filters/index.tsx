import Search from "./Search";
import UserSelect from "./UserSelect";
import FiltersBar from "@/components/Filters/FiltersBar";
import Type from "./Type";
import { SxProps, Theme } from "@mui/material";
import { useCalendarAuth } from "@/services/calendar";

// -----------------------------------------------------------------

const BarSx: SxProps<Theme> = {
    bgcolor: "background.default",
    boxShadow: 0,
};

const Filters = () => (
    <FiltersBar
        sx={BarSx}
        filters={
            <>
                <Search />
                <UserSelect />
                <Type />
            </>
        }
        controls={undefined}
        bottomContent={undefined}
    />
);

// -----------------------------------------------------------------

const Wrapped = () => {
    const { isAuthenticated } = useCalendarAuth();
    if (!isAuthenticated) return null;
    return <Filters />;
};

// -----------------------------------------------------------------

export default Wrapped;
