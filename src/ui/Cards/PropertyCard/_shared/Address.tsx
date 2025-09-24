import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Stack, StackProps, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import AddressIcon from "@/assets/icons/address";

interface AddressProps extends StackProps {
    item: IPropertyResultResponse | IProperties;
}

const Address: FC<AddressProps> = ({ item, ...props }) => {
    const { i18n } = useTranslation();

    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        (item as IPropertyResultResponse) || {};

    const address = useMemo(() => {
        const addressParts =
            i18n.language === "en"
                ? [regionEN, cityEN, complexEN]
                : [regionGR, cityGR, complexGR];

        return addressParts.filter((part) => part).join(", ");
    }, [i18n.language]);

    return (
        <Stack direction="row" alignItems="center" spacing={1} {...props}>
            <AddressIcon />
            <Typography variant="body2" color="text.secondary">
                {address}
            </Typography>
        </Stack>
    );
};

export default Address;
