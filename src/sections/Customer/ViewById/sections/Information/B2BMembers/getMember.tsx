import { SpaceBetween } from "@/components/styled";
import useToggle from "@/hooks/useToggle";
import { B2BMember } from "@/types/customer";
import { Collapse, Grid, IconButton, SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getBorderColor from "@/theme/borderColor";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "@/components/List";
import NationalityListItem from "../NationalityListItem";

const PositionLabel: FC<TypographyProps> = (props) => <Typography {...props} />;

interface DetailsProps {
    m: B2BMember;
}

const Details: FC<DetailsProps> = ({ m }) => {
    const {
        email,
        fax,
        homePhone,
        mobilePhone,
        nationality,
        preferredLanguage,
        suggestedBy,
    } = m;

    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <List>
                    <ListItem label={t("email")} value={email || "-"} />
                    <ListItem
                        label={t("Mobile Phone")}
                        value={mobilePhone || "-"}
                    />
                    <ListItem
                        label={t("Home Phone")}
                        value={homePhone || "-"}
                    />
                    <ListItem label={t("Fax")} value={fax || "-"} />
                </List>
            </Grid>

            <Grid item xs={12} sm={6}>
                <List>
                    <NationalityListItem nationality={nationality?.key} />

                    <ListItem
                        label={t("Preferred Language")}
                        value={preferredLanguage.value || "-"}
                    />

                    <ListItem
                        label={t("Suggested by")}
                        value={suggestedBy || "-"}
                    />
                </List>
            </Grid>
        </Grid>
    );
};

const getToggleSx = (isOpen: boolean): SxProps<Theme> => ({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease-in-out",
});

interface MemberProps {
    m: B2BMember;
}

const Member: FC<MemberProps> = ({ m }) => {
    const { firstName, lastName, position } = m;
    const fullname = `${firstName || ""} ${lastName || ""}`;

    const [isOpen, toggle] = useToggle();

    return (
        <Stack
            spacing={1}
            p={1}
            borderRadius={1}
            borderBottom="1px solid"
            borderColor={getBorderColor}
        >
            <SpaceBetween>
                <Stack direction="row" spacing={1} alignItems="center">
                    {position ? (
                        <PositionLabel>{position}</PositionLabel>
                    ) : null}
                    <Typography variant="body2" fontWeight="bold">
                        {fullname}
                    </Typography>
                </Stack>

                <IconButton
                    size="small"
                    onClick={toggle}
                    sx={getToggleSx(isOpen)}
                >
                    <ExpandMoreIcon fontSize="small" />
                </IconButton>
            </SpaceBetween>

            <Collapse in={isOpen}>
                <Details m={m} />
            </Collapse>
        </Stack>
    );
};

const getMember = (m: B2BMember, i: number) => <Member key={i} m={m} />;

export default getMember;
