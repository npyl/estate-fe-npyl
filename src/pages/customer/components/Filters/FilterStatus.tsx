import { Box, FormControl, Rating } from "@mui/material";
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
            <Box
                sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    p: 0.1,
                    ":hover": {
                        border: "1px solid #000",
                    },
                }}
            >
                <Rating
                    sx={{
                        mt: 0.5,
                        ml: 0.5,
                    }}
                    name="simple-controlled"
                    value={status}
                    onChange={onChange}
                />
            </Box>
        </FormControl>
    );
}
