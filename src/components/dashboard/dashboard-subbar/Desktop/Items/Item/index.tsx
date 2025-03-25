import { Button, ButtonProps } from "@mui/material";
import { FC, PropsWithChildren, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

// -----------------------------------------------------------------------

const useIsCurrent = (path: string) => {
    const currentPath = usePathname();
    const searchParams = useSearchParams();

    const isCurrent = useMemo(() => {
        const url = new URL(path, window.location.href);

        // Check if we are on the same pathname
        if (url.pathname !== currentPath) return false;

        const query = new URLSearchParams(url.search);

        // Check whether *ALL* params of tab (a.k.a. from path) are contained in searchParams (a.k.a. current url)
        for (const [key, value] of query) {
            const test = searchParams.get(key);
            if (test !== value) return false;
        }

        return true;
    }, [path, currentPath, searchParams]);

    return isCurrent;
};

// -----------------------------------------------------------------------

const TabItem: FC<TabItemProps> = ({ t: { path, renderer, resourceId } }) => {
    const isCurrent = useIsCurrent(path);

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
