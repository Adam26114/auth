"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();

    const handleSignOut = () => {
        logout();
    };

    return (
        <div>
            {JSON.stringify(user)}
            <Button type="submit" onClick={handleSignOut}>
                Sign Out
            </Button>
        </div>
    );
};

export default SettingsPage;
