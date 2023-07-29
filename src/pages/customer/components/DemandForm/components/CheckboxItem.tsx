import { Grid, Checkbox, Typography } from "@mui/material";

interface ICheckboxItemProps {
    label: string;
    value: boolean;
    sliceKey: string;
    onChange: (sliceKey: string, checked: boolean) => void;
}

const CheckboxItem = (props: ICheckboxItemProps) => {
    const { label, value, sliceKey, onChange } = props;

    return (
        <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
        >
            <Checkbox
                value={value}
                checked={value}
                onChange={(
                    event: React.ChangeEvent<unknown>,
                    checked: boolean
                ) => onChange(sliceKey, checked)}
                sx={{ cursor: "default" }}
                color="primary"
                inputProps={{ "aria-label": "Panoramic View" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
                {label}
            </Typography>
        </Grid>
    );
};

export default CheckboxItem;
