import { FC } from "react";
import Send from "./Send";
import List from "./List";
import Filters from "./Filters";
import FiltersProvider from "@/sections/Emails/Filters/Context";

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
                <List />
            </FiltersProvider>
            <Send />
        </>
    );
};

export default ViewAll;
