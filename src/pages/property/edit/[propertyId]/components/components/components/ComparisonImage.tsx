import { styled } from "@mui/material/styles";

const ComparisonImage = styled("img")(({theme}) => ({
    width: "100%",
    maxWidth: "45%",
    height: "auto",
    borderRadius: theme.shape.borderRadius,
    marginBottom: "20px",
    marginTop: "20px"
}));

export default ComparisonImage;
