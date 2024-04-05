import { ICustomerResultResponse } from "@/types/customer";
import { Avatar, Card, CardContent, Typography, Stack } from "@mui/material";
import { TypeLabels } from "../TypeLabels";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface CustomerCardProps {
    c: ICustomerResultResponse;
}

const CustomerCard = ({ c }: CustomerCardProps) => {
    const router = useRouter();

    const fullname = `${c.firstName} ${c.lastName}`;
    const avatarInitials = `${c.firstName?.[0] || ""} ${c.lastName?.[0] || ""}`;

    const handleClick = useCallback(() => router.push(`/customer/${c.id}`), []);

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "150px",
                position: "relative",
            }}
            onClick={handleClick}
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
                bottom={2}
                right={2}
                flexWrap="nowrap"
            />
        </Card>
    );
};

export default CustomerCard;
