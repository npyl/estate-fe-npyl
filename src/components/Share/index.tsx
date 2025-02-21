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
} from "react-share";
import { Popover, PopoverProps, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import Button from "./button";
import { StyledPaper } from "./styled";
import GmailButton from "./Buttons/Gmail";
import CopyLinkButton from "./Buttons/CopyLink";
import Section from "./Section";
import dynamic from "next/dynamic";
import EmailButton from "./Buttons/Email";
const FileButton = dynamic(() => import("./Buttons/File"));

// ---------------------------------------------------------------------------

type FacebookButtonProps = React.ComponentProps<typeof FacebookShareButton>;

interface SharePopoverProps extends Omit<PopoverProps, "open" | "onClose"> {
    shareUrls: string[];
    onClose: VoidFunction;

    files?: boolean;
    getFiles?: () => Promise<File[] | null>;
}

const SharePopover = ({
    shareUrls = [],
    onClose,
    files,
    getFiles,
    ...props
}: SharePopoverProps) => {
    const { t } = useTranslation();

    const shareUrl = shareUrls.join("\n");
    const isOne = shareUrls.length === 1;

    const canShareFile = files && getFiles && "share" in window.navigator;

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
                <EmailButton shareUrl={shareUrl} />
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
                {canShareFile ? <FileButton getter={getFiles} /> : null}
            </Section>
        </Popover>
    );
};

export type { SharePopoverProps };
export default SharePopover;
