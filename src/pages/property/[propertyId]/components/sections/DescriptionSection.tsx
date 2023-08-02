import React from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import dynamic from "next/dynamic";
interface DescriptionSectionProps {
    data: IProperties;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = (props) => {
    const { data } = props;

    const ReactQuill = dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => (
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "absolute",
                    bgcolor: "background.paper",
                }}
            >
                Loading...
            </Box>
        ),
    });

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">Description</Typography>
            </Box>
            <Divider></Divider>
            <Grid container spacing={0}>
                <Grid item xs={12} order={"row"}>
                    <Box>
                        <Box
                            padding={3}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",

                                // backgroundColor: "#fff58a",
                                borderRadius: 10,
                            }}
                        >
                            <ReactQuill
                                value={data?.description}
                                readOnly={true}
                                theme={"bubble"}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DescriptionSection;
