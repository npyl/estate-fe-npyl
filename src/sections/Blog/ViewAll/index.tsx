import Content from "./Content";
import FiltersProvider from "./Filters/Context";
import FiltersBar from "./Filters/Bar";

const ViewAllPosts = () => (
    <FiltersProvider>
        <FiltersBar />
        <Content />
    </FiltersProvider>
);

export default ViewAllPosts;
