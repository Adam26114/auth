"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "sonner";

const AdminPage = () => {
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.error) {
                toast.error(data.error, {
                    action: {
                        label: "Cancle",
                        onClick: () => console.log("Cancle"),
                    },
                });
            }

            if (data.success) {
                toast.success(data.success, {
                    action: {
                        label: "Cancle",
                        onClick: () => console.log("Cancle"),
                    },
                });
            }
        });
    };

    const onApiRouteClick = () => {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                toast.success("Allowed API Route!", {
                    action: {
                        label: "Cancle",
                        onClick: () => console.log("Cancle"),
                    },
                });
            } else {
                toast.error("Forbidden API Route!", {
                    action: {
                        label: "Cancle",
                        onClick: () => console.log("Cancle"),
                    },
                });
            }
        });
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
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
