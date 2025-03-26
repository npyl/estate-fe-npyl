import { ITab } from "@/types/tabs";
import { isSameTab, isSameTabOrg } from "./util";

// -----------------------------------------------------------------------

/**
 * Helper method to check whether a questionedPath is contained inside a tabPath with respect to query param
 * @param path
 * @param questionedPath
 * @returns Whether the path in question (questionedPath) is *NOT* contained inside a tabPath (exising tab's path)
 */
const isntContained =
    (questionedPath: string) =>
    ({ path }: ITab) => {
        const tabUrl = new URL(path, window.location.href);
        const queUrl = new URL(questionedPath, window.location.href);

        // Compare pathnames
        if (tabUrl.pathname !== queUrl.pathname) return true;

        // Compare url params
        const tabParams = new URLSearchParams(tabUrl.search);
        const queParams = new URLSearchParams(queUrl.search);

        for (const [key, value] of queParams) {
            const test = tabParams.get(key);
            if (test !== value) return true;
        }

        return false;
    };

// INFO: beauty wrapper
const isntContainedWrap = (t: ITab) => (pn: string) => isntContained(pn)(t);

/**
 *
 * @param p a list of paths in question
 * @returns true if *NONE* of the paths is contained
 */
const isntContainedMultiple = (p: string[]) => (t: ITab) =>
    p.every(isntContainedWrap(t));

// -----------------------------------------------------------------------

const pushOrUpdate = (old: ITab[], t: ITab) => {
    // Update
    if (old.some(isSameTab(t.path))) {
        return old.map((ot) => (ot.path === t.path ? t : ot));
    }

    // Push
    return [...old, t];
};

// -----------------------------------------------------------------------

const updatePath = (old: ITab[], p: string, newP: string) =>
    old.map((ot) => (isSameTabOrg(ot.path, p) ? { ...ot, path: newP } : ot));

// -----------------------------------------------------------------------

export { isntContained, isntContainedMultiple, pushOrUpdate, updatePath };
