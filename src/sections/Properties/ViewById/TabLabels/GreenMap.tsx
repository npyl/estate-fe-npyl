import MuiTab, { TabProps } from "@mui/material/Tab";
import Iconify from "@/components/iconify";

import { styled } from "@mui/material/styles";

const StyledTab = styled(MuiTab)(({ theme }) => ({
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    "&.Mui-selected": { color: "#00b32d" },
}));

const GreenMapTab: React.FC<TabProps> = (props) => (
    <StyledTab
        {...props}
        iconPosition="end"
        icon={
            <Iconify
                icon="ph:tree"
                fontSize="20px"
                width={20}
                height={20}
                sx={{
                    "&.Mui-selected": { color: "#00b32d" },
                    mb: 1,
                }}
            />
        }
    />
);

export default GreenMapTab;
