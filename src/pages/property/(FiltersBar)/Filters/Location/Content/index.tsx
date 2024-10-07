import Box from "@mui/material/Box";
import { FC } from "react";
import dynamic from "next/dynamic";
import RegionsTab from "./Regions";
import { TTab } from "../types";
const CitiesTab = dynamic(() => import("./Cities"));

interface Props {
    tab: TTab;
    debounced: string;
}

const Content: FC<Props> = ({ tab, debounced }) => (
    <Box maxHeight="60vh" overflow="hidden auto">
        {tab === "REGIONS" ? <RegionsTab search={debounced} /> : null}
        {tab === "CITIES" ? <CitiesTab search={debounced} /> : null}
    </Box>
);

export default Content;
