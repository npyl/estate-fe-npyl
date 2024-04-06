import { ICustomerResultResponse, ICustomer } from "@/types/customer";
import { Avatar, Card, CardContent, Stack, Grid } from "@mui/material";
import { TypeLabels } from "../TypeLabels";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { List, ListItem } from "@/components/List";
import { useTranslation } from "react-i18next";

interface CustomerCardProps {
    c: ICustomerResultResponse | ICustomer;
}

const CustomerCard = ({ c }: CustomerCardProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const avatarInitials = `${c.firstName?.[0] || ""} ${c.lastName?.[0] || ""}`;

    const handleClick = useCallback(() => router.push(`/customer/${c.id}`), []);

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "row",
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

            <CardContent
                sx={{
                    pb: 7, // INFO: leave pb so that TypeLabels fall a bit off from the List
                    flex: 1,
                }}
            >
                <Grid container>
                    <Grid item sm={6} flex={1}>
                        <List>
                            <ListItem
                                label={t("First Name")}
                                value={c?.firstName || ""}
                            />
                            <ListItem
                                label={t("Email")}
                                value={c?.email || ""}
                            />
                        </List>
                    </Grid>

                    <Grid item sm={6} flex={1}>
                        <List>
                            <ListItem
                                label={t("Last Name")}
                                value={c?.lastName || ""}
                            />
                            <ListItem
                                label={t("Mobile Phone")}
                                value={c?.mobilePhone || ""}
                            />
                        </List>
                    </Grid>
                </Grid>

                {/* <Typography component="div" variant="h5">
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
                </Typography> */}
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
