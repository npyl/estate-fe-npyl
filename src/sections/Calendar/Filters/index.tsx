import Search from "./Search";
import UserSelect from "./UserSelect";
import FiltersBar from "@/components/Filters/FiltersBar";
import Type from "./Type";
import { SxProps, Theme } from "@mui/material";

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

export default Filters;
