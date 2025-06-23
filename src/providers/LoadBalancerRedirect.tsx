import { useRouter } from "next/router";
import { useEffect } from "react";

const VALID_URL = "https://property-pro.gr";
const LOAD_BALANCER_LITERAL = "load-balancer";

const isLoadBalancer = (h?: string) => h?.includes(LOAD_BALANCER_LITERAL);

const LoadBalancerRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const hostname = window.location.hostname;

        if (isLoadBalancer(hostname)) router.replace(VALID_URL);
    }, []);

    return null;
};

export default LoadBalancerRedirect;
