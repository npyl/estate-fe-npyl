import MuiTypography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";

const Typography: FC<TypographyProps> = (props) => (
    <MuiTypography
        variant="body2"
        fontWeight="bold"
        noWrap
        width={1}
        maxWidth={1}
        overflow="hidden"
        textOverflow="ellipsis"
        {...props}
    />
);

export default Typography;
