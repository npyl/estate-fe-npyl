import { useRouter } from "next/router";
import { useEffect } from "react";

const isDebug = process.env.NODE_ENV === "development";

const VALID_URL = "https://property-pro.gr";
const LOAD_BALANCER_LITERAL = "load-balancer";
const HTTP_LITERAL = "http://";

const isLoadBalancer = (h?: string) => h?.includes(LOAD_BALANCER_LITERAL);
const isHTTP = (h?: string) => !isDebug && h?.startsWith(HTTP_LITERAL);

const LoadBalancerRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const hostname = window.location.hostname;

        if (isLoadBalancer(hostname)) router.replace(VALID_URL);
        if (isHTTP(hostname)) router.replace(VALID_URL);
    }, []);

    return null;
};

export default LoadBalancerRedirect;
