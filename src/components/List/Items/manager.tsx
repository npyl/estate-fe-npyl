import { Typography } from "@mui/material";
import { FC } from "react";
import { IUser } from "src/types/user";
import ListItem from "../item";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";
import { useGetProfileQuery } from "@/services/user";
import Link from "@/components/Link";

// -----------------------------------------------------------

interface ListManagerItemProps extends Omit<ListItemProps, "value" | "label"> {
    manager?: IUser;
    label?: string;
}

const ListManagerItem: FC<ListManagerItemProps> = ({
    manager,
    label,
    ...props
}) => {
    const { t } = useTranslation();

    const { data } = useGetProfileQuery();
    const { firstName, lastName } = data || {};
    const fullname =
        firstName || lastName ? `${firstName || ""} ${lastName || ""}` : "-";

    return (
        <ListItem label={label || t("Manager")} {...props}>
            <Link href={`/user/${manager?.id}`}>
                <CustomButton variant="outlined">
                    <CustomAvatar />
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {fullname}
                    </Typography>
                </CustomButton>
            </Link>
        </ListItem>
    );
};

export default ListManagerItem;
