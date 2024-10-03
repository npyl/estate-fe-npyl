import Box from "@mui/material/Box";
import Card, { CardProps } from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import AvatarShape from "./AvatarShape";

import { ICustomer, ICustomerResultResponse } from "@/types/customer";

import { TypeLabels } from "@/components/TypeLabels";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Link from "@/components/Link";

// ----------------------------------------------------------------------

const StyledBackground = styled(Box)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
}));

// ----------------------------------------------------------------------

type Props = CardProps & {
    c: ICustomer | ICustomerResultResponse;
};

export default function UserCard({ c, ...props }: Props) {
    const { id, firstName, lastName, email, mobilePhone } = c || {};

    const { t } = useTranslation();

    const name = `${firstName} ${lastName}`;
    const initials = `${firstName[0]} ${lastName[0]}`;

    return (
        <Card
            sx={{
                textAlign: "center",
                minHeight: "320px",
            }}
            component={Link}
            href={`/customer/${id}`}
            {...props}
        >
            <StyledBackground position="relative" height="100px">
                <AvatarShape
                    sx={{
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        mx: "auto",
                        bottom: -26,
                        position: "absolute",
                    }}
                />

                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        zIndex: 1,
                        left: 0,
                        right: 0,
                        bottom: -32,
                        mx: "auto",
                        position: "absolute",
                    }}
                >
                    {initials}
                </Avatar>

                <TypeLabels
                    buyer={c.buyer}
                    leaser={c.leaser}
                    lessor={c.lessor}
                    seller={c.seller}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        p: 1,
                    }}
                />
            </StyledBackground>

            <ListItemText
                sx={{ mt: 7 }}
                primary={name}
                primaryTypographyProps={{ typography: "subtitle1" }}
                secondaryTypographyProps={{ component: "span", mt: 0.5 }}
            />

            <Typography
                variant="body2"
                component="div"
                sx={{ mb: 1, color: "text.secondary" }}
            >
                {email}
            </Typography>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Box
                display="grid"
                gridTemplateColumns="repeat(1, 1fr)"
                sx={{ py: 3, typography: "subtitle1" }}
            >
                <div>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ mb: 0.5, color: "text.secondary" }}
                    >
                        {t("Mobile Phone")}
                    </Typography>
                    {mobilePhone}
                </div>
            </Box>
        </Card>
    );
}
