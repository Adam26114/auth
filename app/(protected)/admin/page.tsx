"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminPage = () => {

    const onApiRouteClick = () => {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                console.log("OKAY");
            } else {
                console.log("FORBIDDEN");
            }
        });
        // console.log("hello");
    };

    return (
        <Card className="w-[600px] bg-secondary">
            <CardHeader>
                <p className="flex items-center justify-center gap-1 text-2xl font-semibold juc">
                    <MdAdminPanelSettings /> Admin
                </p>
            </CardHeader>
            <CardContent className=" space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>
                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className=" text-sm font-medium">Admin-only API ROUTE</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>

                <div className=" bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className=" text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button >Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
