import { FC } from "react";
import Send from "./Send";
import List from "./List";
import Filters from "./Filters";
import FiltersProvider from "@/sections/Emails/Filters/Context";
import IsAuthenticatedGuard from "../Google/IsAuthenticatedGuard";

interface Props {
    to?: string;
    propertyId?: number;
}

const ViewAll: FC<Props> = ({ to, propertyId }) => (
    <FiltersProvider to={to} propertyId={propertyId}>
        <Filters />
        <IsAuthenticatedGuard>
            <List />
        </IsAuthenticatedGuard>
        <Send />
    </FiltersProvider>
);

export default ViewAll;
