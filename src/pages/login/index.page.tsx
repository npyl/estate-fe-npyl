import type { NextPage } from "next";
import GuestGuard from "@/sections/Login/guest-guard";
import LoginSection from "@/sections/Login";

const Login: NextPage = () => <LoginSection />;

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
