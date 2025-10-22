import Tester from "@/sections/__test__/RefreshToken";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const TesterPage = () => <Tester />;

export default TesterPage;
