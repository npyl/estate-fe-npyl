import { FormControl, InputLabel, Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectStatus, setStatus } from "src/slices/customer/filters";

export default function FilterStatus() {
    const dispatch = useDispatch();

    const status = useSelector(selectStatus) || 0;

    const onChange = (_event: any, value: number | null) => {
        dispatch(
            setStatus(
                // On autofill we get a stringified value.
                value ? value : undefined
            )
        );
    };

    return (
        <FormControl sx={{ width: 135 }}>
            <InputLabel>Status</InputLabel>
            <Rating
                name="simple-controlled"
                value={status}
                onChange={onChange}
            />
        </FormControl>
    );
}
