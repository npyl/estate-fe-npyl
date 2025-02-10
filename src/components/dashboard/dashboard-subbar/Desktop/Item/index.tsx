import { Button, ButtonProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/Link";
import { ITab } from "@/types/tabs";
import ClearButton from "./ClearButton";
import Content from "./Content";
import { getButtonSx } from "./styles";
import Icon from "./Icon";

type TabItemProps = Omit<ButtonProps, "label"> & { t: ITab };

const ResponsiveLabel: FC<PropsWithChildren> = ({ children }) => (
    <span
        style={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "330px",
        }}
    >
        {children}
    </span>
);

const TabItem: FC<TabItemProps> = ({ t: { path, renderer, resourceId } }) => {
    const currentPath = usePathname();
    const isCurrent = currentPath === path;

    return (
        <Button
            LinkComponent={Link}
            href={path}
            sx={getButtonSx(isCurrent)}
            endIcon={<ClearButton path={path} />}
        >
            <Icon renderer={renderer} />
            <ResponsiveLabel>
                <Content renderer={renderer} resourceId={resourceId} />
            </ResponsiveLabel>
        </Button>
    );
};

export default TabItem;
