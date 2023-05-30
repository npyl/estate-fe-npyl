import { Grid, Checkbox, Typography } from "@mui/material";

interface ICheckboxItemProps {
    label: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<unknown>, checked: boolean) => void;
}

const CheckboxItem = (props: ICheckboxItemProps) => {
    const { value, label, onChange } = props;

    return <Grid
        item
        xs={3}
        flexDirection="row"
        sx={{ display: "inline-flex", alignItems: "center" }}
    >
        <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            sx={{ cursor: "default" }}
            color="primary"
            inputProps={{ "aria-label": "Panoramic View" }}
        />
        <Typography variant="body1" sx={{ ml: 0 }}>
            {label}
        </Typography>
    </Grid>
}

export default CheckboxItem;