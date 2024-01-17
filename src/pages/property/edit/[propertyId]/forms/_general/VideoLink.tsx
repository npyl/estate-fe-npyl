import * as React from "react";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "src/components/hook-form";
import Panel from "src/components/Panel";

const VideoLinkSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Video Link")}>
            <RHFTextField fullWidth label={t("Video Link")} name="video" />
        </Panel>
    );
};

export default VideoLinkSection;
