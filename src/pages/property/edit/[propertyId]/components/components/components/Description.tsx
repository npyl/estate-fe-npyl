import { connect } from "react-redux";
import { setDescription } from "src/slices/property";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material";
import * as React from "react";
import Editor from "src/components/editor/Editor";
import { useTranslation } from "react-i18next";

interface DescriptionSectionProps {
    description: string;
    setDescription: (description: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
    description,
    setDescription,
}) => {
    const { t } = useTranslation();
    return (
        <Grid item xs={12} padding={0}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        {" "}
                        <Box
                            sx={{
                                px: 3,
                                py: 1.5,
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            <Typography variant="h6" flex={1}>
                                {t("Description")}
                            </Typography>
                        </Box>
                        <CardContent>
                            <Editor
                                id="full-editor"
                                value={description}
                                onChange={(value) => setDescription(value)}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state: any) => ({
    description: state.property.description,
});

const mapDispatchToProps = (dispatch: any) => ({
    setDescription: (description: string) =>
        dispatch(setDescription(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionSection);
