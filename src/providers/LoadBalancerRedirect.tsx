import { useRouter } from "next/router";
import { useEffect } from "react";

const isDebug = process.env.NODE_ENV === "development";

const VALID_URL = "https://property-pro.gr";
const LOAD_BALANCER_LITERAL = "load-balancer";
const HTTP_LITERAL = "http:";
const LOCALHOST_LITERAL0 = "localhost";
const LOCALHOST_LITERAL1 = "127.0.0.1";

const isLoadBalancer = (h?: string) => h?.includes(LOAD_BALANCER_LITERAL);
const isHTTP = () => !isDebug && window.location.protocol === HTTP_LITERAL;
const isLocalhost = (h?: string) =>
    h?.includes(LOCALHOST_LITERAL0) || h?.includes(LOCALHOST_LITERAL1);

const LoadBalancerRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const hostname = window.location.hostname;

        // Redirect load balancer URLs
        if (isLoadBalancer(hostname)) {
            router.replace(VALID_URL);
            return;
        }

        // Redirect HTTP to HTTPS, but allow localhost in production builds
        if (isHTTP() && !isLocalhost(hostname)) {
            router.replace(VALID_URL);
            return;
        }
    }, []);

    return null;
};

export default LoadBalancerRedirect;
