import Background from "@/components/Background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center">
            <Background >{children}</Background>
        </div>
    );
};

export default AuthLayout;
