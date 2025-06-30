import { FC } from "react";
import Content from "./Content";
import FiltersProvider from "./Filters/Context";
import FiltersBar from "./Filters/Bar";

interface Props {
    siteId: number;
}

const ViewAllPosts: FC<Props> = ({ siteId }) => (
    <FiltersProvider>
        <FiltersBar />
        <Content siteId={siteId} />
    </FiltersProvider>
);

export default ViewAllPosts;
