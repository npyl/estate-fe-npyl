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

type FacebookProps = React.ComponentProps<typeof FacebookShareButton>;
type TwitterProps = React.ComponentProps<typeof TwitterShareButton>;
type WhatsappProps = React.ComponentProps<typeof WhatsappShareButton>;
type ViberProps = React.ComponentProps<typeof ViberShareButton>;
type LinkedinProps = React.ComponentProps<typeof LinkedinShareButton>;
type EmailProps = React.ComponentProps<typeof EmailShareButton>;

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

interface SharePopoverProps extends Omit<PopoverProps, "open" | "onClose"> {
    shareUrl: string;
    onClose: VoidFunction;
}

const SharePopover = ({ shareUrl, onClose, ...props }: SharePopoverProps) => {
    const { t } = useTranslation();

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
                    icon={WhatsappIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={ViberShareButton}
                    label="Viber"
                    icon={ViberIcon}
                    shareUrl={shareUrl}
                />
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Email")}>
                <Button
                    Component={EmailShareButton}
                    label="Email"
                    icon={EmailIcon}
                    shareUrl={shareUrl}
                />

                <GmailButton shareUrl={shareUrl} />
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Social Networks")}>
                <Button
                    Component={FacebookShareButton}
                    label="Facebook"
                    icon={FacebookIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={TwitterShareButton}
                    label="X"
                    icon={XIcon}
                    shareUrl={shareUrl}
                />
                <Button
                    Component={LinkedinShareButton}
                    label="LinkedIn"
                    icon={LinkedinIcon}
                    shareUrl={shareUrl}
                />
            </Section>

            <Divider sx={{ width: "100%" }} />

            <Section title={t("Other")}>
                <CopyLinkButton shareUrl={shareUrl} />
            </Section>
        </Popover>
    );
};

export default SharePopover;
