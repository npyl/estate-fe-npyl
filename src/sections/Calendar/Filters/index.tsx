import Stack from "@mui/material/Stack";
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
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Search />
                <UserSelect />
                <Type />
            </Stack>
        }
        controls={undefined}
        bottomContent={undefined}
    />
);

export default Filters;
