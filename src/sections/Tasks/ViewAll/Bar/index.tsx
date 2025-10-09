import { SxProps, Theme } from "@mui/material";
import Search from "./Search";
import UserSelect from "./UserSelect";
import AddButtons from "./AddButtons";
import Priority from "./Priority";
import ModeButton from "./ModeButton";
import SortBy from "./SortBy";
import Labels from "./Labels";
import FiltersBar from "@/components/Filters/FiltersBar";
import { FC } from "react";

const BarSx: SxProps<Theme> = {
    backgroundColor: "background.default",
    zIndex: 50,
    borderRadius: "10px",
    borderBottom: "1px solid",
    borderColor: "divider",
    boxShadow: 0,
};

interface BarProps {
    create?: boolean;
}

const Bar: FC<BarProps> = ({ create }) => (
    <FiltersBar
        sx={BarSx}
        filters={
            <>
                <Search />
                <UserSelect />
                <Priority />
                <Labels />
                <SortBy />
            </>
        }
        controls={
            <>
                <ModeButton />
                <AddButtons create={create} />
            </>
        }
        bottomContent={undefined}
    />
);

export default Bar;
