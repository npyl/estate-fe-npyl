import {
    setOrganizationId,
    selectOrganizationId,
} from "@/slices/customer/filters";
import OrganizationAutocomplete from "@/ui/Autocompletes/Organization";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const OrganizationFilter = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const value = useSelector(selectOrganizationId);
    const onChange = useCallback(
        (v: number) => dispatch(setOrganizationId(v)),
        []
    );

    return (
        <OrganizationAutocomplete
            value={value}
            onChange={onChange}
            label={t<string>("Organization")}
            sx={{
                width: "300px",
            }}
        />
    );
};

export default OrganizationFilter;
