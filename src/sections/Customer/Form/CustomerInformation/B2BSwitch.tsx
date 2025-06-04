import { SxProps, Theme } from "@mui/material";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";

const Sx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    mr: 2,

    bgcolor: "background.neutral",
    pr: 1,
    borderRadius: 1,
};

const B2bSwitch = () => <RHFIOSSwitch label="B2B" name="b2b" sx={Sx} />;

export default B2bSwitch;
