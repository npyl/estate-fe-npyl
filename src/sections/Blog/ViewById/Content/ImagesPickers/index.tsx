import Grid from "@mui/material/Unstable_Grid2";
import ImagePicker from "./ImagePicker";
import MiddleImagesPicker from "./MiddleImagesPicker";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

interface Props {
    postId: number;
    image?: string;
}

const ImagesPickers: FC<Props> = ({ postId, image }) => {
    const { t } = useTranslation();
    return (
        <Grid container spacing={1}>
            <Grid xs={12} lg={6}>
                <ImagePicker postId={postId} image={image} />
            </Grid>
            <Grid xs={12} lg={6}>
                <Typography textAlign="center" variant="h5">
                    {t("MiddleImages")}
                </Typography>
                <MiddleImagesPicker images={[]} />
            </Grid>
        </Grid>
    );
};

export default ImagesPickers;
