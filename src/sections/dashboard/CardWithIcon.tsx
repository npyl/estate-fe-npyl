import { Card, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
interface CardWithIconProps {
    title: string;
    subtitle: string;
    info?: string;
}

export default function CardWithIcon({
    title,
    subtitle,
    info,
}: CardWithIconProps) {
    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
                px: 3,
                py: 5,
                borderRadius: 2,
            }}
        >
            <Stack spacing={0.5}>
                <Typography variant="h4">{title}</Typography>
                <Stack spacing={1} direction="row" alignItems="center">
                    <Typography
                        variant="subtitle2"
                        sx={{ color: "text.disabled" }}
                    >
                        {subtitle}
                    </Typography>
                    {info ? (
                        <Tooltip title={info} placement="top" sx={{ p: 2 }}>
                            <InfoOutlinedIcon
                                sx={{
                                    cursor: "pointer",
                                    color: "rgb(51, 102, 255)",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            />
                        </Tooltip>
                    ) : null}
                </Stack>
            </Stack>
        </Card>
    );
}
