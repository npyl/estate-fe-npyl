import useCookie from "@/hooks/useCookie";

const cookieName = "pp-tasks-mode";

const useModeCookie = () => useCookie<"board" | "list">(cookieName, "board");

export default useModeCookie;
