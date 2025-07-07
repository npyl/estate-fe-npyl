import { FC } from "react";
import { useChangedFields } from "@/sections/Blog/ViewAll/Filters/Context";
import { BlogFilters } from "@/types/company";
import PublishedChip from "./Published";
import UsersChip from "./Users";
import SitesChip from "./Sites";

interface GeneralChipProps {
    filterKey: keyof BlogFilters;
}

const GeneralChip: FC<GeneralChipProps> = ({ filterKey }) => {
    const changedProps = useChangedFields();
    const values = changedProps[filterKey];

    if (values == undefined || (Array.isArray(values) && values.length === 0))
        return null;

    if (filterKey === "published") return <PublishedChip />;
    if (filterKey === "users") return <UsersChip />;
    if (filterKey === "sites") return <SitesChip />;

    return null;
};

export default GeneralChip;
