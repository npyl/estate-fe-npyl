import { IProperties, IPropertyResultResponse } from "@/types/properties";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";

interface EntryProps extends PropsWithChildren {
    icon: string;
    adornment?: string;
}

const Entry: FC<EntryProps> = ({ icon, adornment, children }) => (
    <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography>
            <i className={icon} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {children}
        </Typography>
        {adornment ? (
            <Typography variant="body2" color="text.secondary">
                {adornment}
            </Typography>
        ) : null}
    </Stack>
);

interface InfoProps {
    item: IPropertyResultResponse | IProperties;
}

const LandInfo: FC<InfoProps> = ({ item }) => {
    const { details, plotArea } = item || {};

    return (
        <Stack spacing={2} direction="row" mt={1} flexWrap="nowrap">
            <Entry icon="las la-chart-area" adornment="m²">
                {plotArea || "-"}
            </Entry>
            <Entry icon="la-divide">{details?.setbackCoefficient || "-"}</Entry>
            <Entry icon="las la-expand-arrows-alt" adornment="m²">
                {details?.frontage || item?.plotArea || "-"}
            </Entry>
        </Stack>
    );
};

const NonLandInfo: FC<InfoProps> = ({ item }) => {
    const { details, area, plotArea } = item || {};
    const bathrooms = details?.bathrooms;
    const bedrooms = details?.bedrooms;

    return (
        <Stack spacing={2} direction="row" mt={1} flexWrap="nowrap">
            <Entry icon="las la-chart-area" adornment="m²">
                {plotArea || "-"}
            </Entry>
            <Entry icon="las la-expand-arrows-alt" adornment="m²">
                {area || "-"}
            </Entry>
            <Entry icon="las la-bed">{bedrooms || item.bedrooms || "-"} </Entry>
            <Entry icon="las la-bath">
                {bathrooms || item.bathrooms || "-"}
            </Entry>
        </Stack>
    );
};

const Info: FC<InfoProps> = ({ item }) => {
    const { parentCategory } = item;
    return (
        <Stack spacing={1} direction="row" mt={1} flexWrap="wrap">
            {parentCategory.key !== "LAND" ? <NonLandInfo item={item} /> : null}
            {parentCategory.key === "LAND" ? <LandInfo item={item} /> : null}
        </Stack>
    );
};

export default Info;
