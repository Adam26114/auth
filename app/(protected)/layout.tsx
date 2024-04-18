import Background from "@/components/Background";
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="w-full h-full">
            <Background>
                <div className="flex flex-col justify-center items-center gap-y-8">
                    <Navbar />
                    {children}
                </div>
            </Background>
        </div>
    );
};

export default ProtectedLayout;
