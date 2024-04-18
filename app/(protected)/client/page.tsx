"use client";

import UserInfo from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { IoDesktop } from "react-icons/io5";


const ClientPage = () => {
    const user = useCurrentUser();

    return (
        <UserInfo user={user} label="Client Component" icon={<IoDesktop />} />
    );
};

export default ClientPage;
