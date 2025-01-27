import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { SettingsButton } from "@/components/dashboard/settings-button";

const Header = () => {
    const { user } = useAuth();

    return (
        <Stack width="fit-content" py={0.5} px={1}>
            <Typography
                variant="subtitle1"
                textAlign="center"
                noWrap
                width="fit-content"
                color="text.secondary"
            >
                {user?.username}
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                ml={5}
            >
                <LanguageButton />
                <SettingsButton />
            </Stack>
        </Stack>
    );
};

export default Header;
