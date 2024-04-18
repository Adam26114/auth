import { BackButton } from "@/components/auth/back-button";
import { ErrorCard } from "@/components/auth/error-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthErrorPage = () => {
    return (
        <div className=" space-y-4">
            <h1 className="text-[60px] font-bold  capitalize">
                Oops, <br /> <span className=" text-[#027DFF]"> nothing</span>{" "}
                here...
            </h1>
            <p>
                The page you are looking for does&apos;t exist. or an other error
                occurred, go back to home page.
            </p>
            {/* <BackButton label="Back to login" href="/auth/login" /> */}
            <Button className="font-normal" size="sm">
                <Link href="/auth/login">Go Back</Link>
            </Button>
        </div>
        // <ErrorCard/>
    );
};

export default AuthErrorPage;
