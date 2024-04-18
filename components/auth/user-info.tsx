import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HiIdentification } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
    icon?: any;
}

const UserInfo = ({ user, label, icon }: UserInfoProps) => {
    return (
        <Card className=" bg-secondary w-[600px] shadow-md">
            <CardHeader>
                <p className=" text-2xl font-semibold text-center flex items-center justify-center gap-2">
                    {icon}
                    {label}
                </p>
            </CardHeader>
            <CardContent className=" space-y-4">
                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className=" text-sm font-medium">ID</p>
                    <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md hover:max-w-full">
                        {user?.id}
                    </p>
                </div>

                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className=" text-sm font-medium">Name</p>
                    <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md hover:max-w-full">
                        {user?.name}
                    </p>
                </div>

                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className=" text-sm font-medium">Email</p>
                    <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md hover:max-w-full">
                        {user?.email}
                    </p>
                </div>

                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className=" text-sm font-medium">Role</p>
                    <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md hover:max-w-full">
                        {user?.role}
                    </p>
                </div>

                <div className="bg-white flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className=" text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <div className=" truncate text-xs max-w-[180px] font-mono p-1 rounded-md hover:max-w-full">
                        {user?.isTwoFactorEnabled ? (
                            <Badge variant="success">ON</Badge>
                        ) : (
                            <Badge variant="destructive">OFF</Badge>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
