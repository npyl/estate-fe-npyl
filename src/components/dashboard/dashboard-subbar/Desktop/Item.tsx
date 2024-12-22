import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import useResponsive from "@/hooks/useResponsive";
import { FC, useCallback, MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import MuiClearIcon from "@mui/icons-material/Clear";
import { useTabsContext } from "@/contexts/tabs";
import { usePathname } from "next/navigation";
import Link from "@/components/Link";

const ClearIcon = styled(MuiClearIcon)({
    height: "20px",
    width: "20px",
    padding: "3px",
    "&:hover": {
        borderRadius: "20px",
        backgroundColor: "white",
        color: "black",
    },
});

interface TabItemProps extends ButtonProps {
    path: string;
    label: string;
}

const getButtonSx = (current: boolean): SxProps<Theme> => ({
    border: "1px solid",
    borderColor: getBorderColor2,
    display: "flex",
    marginInline: 2,
    justifyContent: "space-between",
    alignItems: "center",

    ...(current
        ? {
              color: (theme) => theme.palette.neutral?.[200],
              backgroundColor: (theme) => theme.palette.primary.main,

              "&:hover": {
                  color: (theme) => theme.palette.neutral?.[100],
                  backgroundColor: (theme) => theme.palette.primary.dark,
              },
          }
        : {
              color: (theme) =>
                  theme.palette.mode === "light"
                      ? theme.palette.neutral?.[900]
                      : theme.palette.neutral?.[200],

              backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                      ? theme.palette.background.paper
                      : theme.palette.neutral?.[800],
          }),

    boxShadow: (theme) => theme.shadows[5],
    transition: "all 0.3s ease",
    cursor: "pointer",
    flexDirection: "row",
    minWidth: "275px",
    width: "max-content",
    maxWidth: "350px",
    // Text Content
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
});

const getLabel = (belowSm: boolean, label: string) => {
    let res = label;

    if (belowSm) {
        const parts = label.split(" ");
        res = parts[parts.length - 1]; // First two words only
    }

    return res;
};

/* Code to keep the Clear icon always inside the SubbarItem and cut the text with '...' */
interface ResponsiveLabelProps {
    label: string;
}

const ResponsiveLabel: FC<ResponsiveLabelProps> = ({ label }) => {
    const belowSm = useResponsive("down", "sm");

    return (
        <span
            style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
            }}
        >
            {getLabel(belowSm, label)}
        </span>
    );
};

interface ClearButtonProps {
    path: string;
}

const ClearButton: FC<ClearButtonProps> = ({ path }) => {
    const { removeTab } = useTabsContext();

    const handleRemove = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        removeTab(path);

        // const tabsAfterRemove = removeTabNoChange(id);

        // const currentTabIndex = appTabs.findIndex(
        //     ({ id: _id }) => _id === id
        // );
        // const isCurrentLast = appTabs[appTabs.length - 1].id === id;
        // const hasMoreAfterRemove = tabsAfterRemove.length > 0;

        // // Determine the base path based on the current path
        // const basePath = currentPath.startsWith("/property")
        //     ? "/property"
        //     : currentPath.startsWith("/customer")
        //     ? "/customers"
        //     : "/customers";

        // const newUrl = hasMoreAfterRemove
        //     ? isCurrentLast
        //         ? tabsAfterRemove[tabsAfterRemove.length - 1].path
        //         : tabsAfterRemove[currentTabIndex].path
        //     : basePath;

        // removeTab(id);

        // router.push(newUrl);
    }, []);

    return <ClearIcon onClick={handleRemove} />;
};

const TabItem: FC<TabItemProps> = ({ path, label }) => {
    const currentPath = usePathname();
    const isCurrent = currentPath === path;

    return (
        <Button
            LinkComponent={Link}
            href={path}
            sx={getButtonSx(isCurrent)}
            endIcon={<ClearButton path={path} />}
        >
            <ResponsiveLabel label={label} />
        </Button>
    );
};

export default TabItem;
