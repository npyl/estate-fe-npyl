// @mui
import {
    Box,
    Card,
    CardHeader,
    CardProps,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
// utils
// components
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Place } from "src/types/googleMap";
import { Scrollbar } from "src/components/scrollbar";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

interface Props extends CardProps {
    title?: string;
    list: Place[];
    duration: any;
    data?: any;
}

export default function RelatedPlaces({
    title,
    data,
    list,
    duration,
    ...other
}: Props) {
    return (
        <Card {...other}>
            <CardHeader title={title} />
            {data?.location?.lat != null &&
            data?.location?.lng != null &&
            list.length == 0 ? (
                <Typography textAlign={"center"}>No results</Typography>
            ) : (
                !data?.location?.lat &&
                !data?.location?.lng && (
                    <Typography textAlign={"center"}>No location</Typography>
                )
            )}
            <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    {list.map((app, i) => (
                        <ApplicationItem
                            key={app.place_id}
                            app={app}
                            duration={duration[i]}
                        />
                    ))}
                </Stack>
            </Scrollbar>
        </Card>
    );
}

// ----------------------------------------------------------------------

type ApplicationItemProps = {
    app: Place;
    duration: any;
};

function ApplicationItem({ app, duration }: ApplicationItemProps) {
    const { vicinity, rating, name } = app;
    const { t } = useTranslation();

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
                <Typography variant="subtitle2">{name}</Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mt: 0.5, color: "text.secondary" }}
                >
                    <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                        {t("Distance")}: {duration?.distance?.text}
                    </Typography>

                    <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                        {t("Walking time")}:{" "}
                        <DirectionsWalkIcon sx={{ fontSize: "13px" }} />{" "}
                        {duration?.duration?.text}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mt: 0.5, color: "text.secondary" }}
                >
                    <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                        {vicinity}
                    </Typography>
                </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ pr: 3 }}>
                <Rating
                    readOnly
                    size="small"
                    precision={0.5}
                    name="reviews"
                    value={rating}
                />
            </Stack>
        </Stack>
    );
}
