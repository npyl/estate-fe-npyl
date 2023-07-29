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
import { Label } from "src/components/label";
import { Place } from "src/types/googleMap";
import { Scrollbar } from "../../../../components/scrollbar";
// ----------------------------------------------------------------------

interface Props extends CardProps {
    title?: string;

    list: Place[];
    duration: any;
}

export default function RelatedPlaces({
    title,

    list,
    duration,
    ...other
}: Props) {
    return (
        <Card {...other}>
            <CardHeader title={title} />
            {list.length == 0 && (
                <Typography textAlign={"center"}>
                    Δεν βρέθηκαν αποτελέσματα
                </Typography>
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
    const { vicinity, rating, opening_hours, name } = app;

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
                        Απόσταση: {duration?.distance?.text}
                    </Typography>
                    <DirectionsWalkIcon sx={{ fontSize: "14px" }} />
                    <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                        {duration?.duration?.text} με τα πόδια
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

                    <Label
                        variant="soft"
                        color={opening_hours?.open_now ? "success" : "error"}
                    >
                        {opening_hours?.open_now ? "Ανοιχτό τώρα" : "Κλειστό"}
                    </Label>
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
