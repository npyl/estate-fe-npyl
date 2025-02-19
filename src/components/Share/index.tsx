import {
    WhatsappShareButton,
    WhatsappIcon,
    ViberShareButton,
    ViberIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    XIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share";
import {
    Popover,
    PopoverProps,
    Typography,
    Divider,
    Stack,
    StackProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Button from "./button";
import { StyledPaper } from "./styled";
import CopyLinkButton from "./CopyLinkButton";
import { FC } from "react";
import GmailButton from "./GmailButton";

// ---------------------------------------------------------------------------

interface SectionProps extends StackProps {
    title: string;
}

const Section: FC<SectionProps> = ({ title, children, ...props }) => (
    <Stack width={1} spacing={1} {...props}>
        <Typography variant="h6" fontWeight="400">
            {title}
        </Typography>
        <Stack width={1} spacing={0.5}>
            {children}
        </Stack>
    </Stack>
);

// ---------------------------------------------------------------------------

type FacebookButtonProps = React.ComponentProps<typeof FacebookShareButton>;

// TODO: update this to handle properties that are:
// 1. published on a different public

const getShareUrl = (lang: string) => (propertyId: number) =>
    `https://www.kopanitsanos.gr/${lang}/property-detail/${propertyId}`;

interface SharePopoverProps extends Omit<PopoverProps, "open" | "onClose"> {
    propertyIds: number[];
    onClose: VoidFunction;
}

const SharePopover = ({
    propertyIds = [],
    onClose,
    ...props
}: SharePopoverProps) => {
    const { t, i18n } = useTranslation();

    const lang = i18n.language === "el" ? "gr" : "en";

    const shareUrl = propertyIds.map(getShareUrl(lang)).join("\n");
    const isOne = propertyIds.length === 1;

    return (
        <Popover
            open
            {...props}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            keepMounted
            slots={{
                paper: StyledPaper,
            }}
            onClose={onClose}
        >
            <Section title={t("Chat")}>
                <Button
                    Component={WhatsappShareButton}
                    label="WhatsApp"
                    Icon={WhatsappIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={ViberShareButton}
                    label="Viber"
                    Icon={ViberIcon}
                    shareUrl={shareUrl}
                />
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Email")}>
                <Button
                    Component={EmailShareButton}
                    label="Email"
                    Icon={EmailIcon}
                    shareUrl={shareUrl}
                />

                <GmailButton shareUrl={shareUrl} />
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Social Networks")}>
                {isOne ? (
                    <Button<FacebookButtonProps>
                        Component={FacebookShareButton}
                        label="Facebook"
                        Icon={FacebookIcon}
                        shareUrl={shareUrl}
                    />
                ) : null}

                <Button
                    Component={TwitterShareButton}
                    label="X"
                    Icon={XIcon}
                    shareUrl={shareUrl}
                />

                {isOne ? (
                    <Button
                        Component={LinkedinShareButton}
                        label="LinkedIn"
                        Icon={LinkedinIcon}
                        shareUrl={shareUrl}
                    />
                ) : null}
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Other")}>
                <CopyLinkButton many={!isOne} shareUrl={shareUrl} />
            </Section>
        </Popover>
    );
};

export default SharePopover;
