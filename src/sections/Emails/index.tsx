import { FC } from "react";
import Send from "./Send";
import List from "./List";
import Filters from "./Filters";
import FiltersProvider from "@/sections/Emails/Filters/Context";
import IsAuthenticatedGuard from "./IsAuthenticatedGuard";

interface Props {
    customerId?: number;
    propertyId?: number;
}

const ViewAll: FC<Props> = ({ customerId, propertyId }) => {
    // TODO: customerId, propertyId, ...

    return (
        <>
            <FiltersProvider>
                <Filters />
                <IsAuthenticatedGuard>
                    <List />
                </IsAuthenticatedGuard>
            </FiltersProvider>
            <Send />
        </>
    );
};

export default ViewAll;
