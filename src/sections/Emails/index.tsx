import { FC } from "react";
import Send from "./Send";
import List from "./List";
import Filters from "./Filters";

interface Props {
    customerId?: number;
    propertyId?: number;
}

const ViewAll: FC<Props> = ({ customerId, propertyId }) => {
    return (
        <>
            <Filters />
            <List />
            <Send />
        </>
    );
};

export default ViewAll;
