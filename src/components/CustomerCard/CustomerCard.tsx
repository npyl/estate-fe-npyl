import { ICustomerResultResponse } from "@/types/customer";
import { Avatar, Card, CardContent, Typography, Stack } from "@mui/material";
import { TypeLabels } from "../TypeLabels";
import useResponsive from "@/hooks/useResponsive";

interface CustomerCardProps {
    c: ICustomerResultResponse;
}

const CustomerCard = ({ c }: CustomerCardProps) => {
    const fullname = `${c.firstName} ${c.lastName}`;
    const avatarInitials = `${c.firstName?.[0] || ""} ${c.lastName?.[0] || ""}`;

    const belowSm = useResponsive("down", "sm");

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Stack direction="row" justifyContent="center" p={2}>
                <Avatar
                    sx={{
                        height: "80px",
                        width: "80px",
                    }}
                >
                    {avatarInitials}
                </Avatar>
            </Stack>

            <Stack width={1} position="relative">
                <CardContent>
                    <Typography component="div" variant="h5">
                        {fullname}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        {c.email}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                    >
                        {c.mobilePhone}
                    </Typography>
                </CardContent>

                <TypeLabels
                    seller={c.seller}
                    lessor={c.lessor}
                    leaser={c.leaser}
                    buyer={c.buyer}
                    p={1}
                    position="absolute"
                    top={2}
                    right={2}
                    flexDirection={belowSm ? "column" : "row"}
                />
            </Stack>
        </Card>
    );
};

export default CustomerCard;
