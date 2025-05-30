import { FC } from "react";
import Send from "./Send";
import List from "./List";
import Filters from "./Filters";
import FiltersProvider from "@/sections/Emails/Filters/Context";
import IsAuthenticatedGuard from "../Google/IsAuthenticatedGuard";
import Box from "@mui/material/Box";

interface Props {
    to?: string;
    propertyId?: number;
}

const ViewAll: FC<Props> = ({ to, propertyId }) => (
    <FiltersProvider to={to} propertyId={propertyId}>
        <Filters />
        <IsAuthenticatedGuard>
            <Box mt={1} />
            <List />
            <Send />
        </IsAuthenticatedGuard>
    </FiltersProvider>
);

export default ViewAll;
