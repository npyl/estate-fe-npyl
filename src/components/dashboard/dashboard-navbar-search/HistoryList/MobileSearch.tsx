import SearchInput from "@/components/Search/SearchInput";
import Stack from "@mui/material/Stack";

const MobileSearch = () => (
    <Stack px={1} width={1}>
        <SearchInput
            sx={{
                width: 1,
                input: {
                    pl: "15px",
                },
            }}
        />
    </Stack>
);

export default MobileSearch;
