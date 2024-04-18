import Link from "next/link";

interface LinksProps {
    href: string;
    label: string;
}
const Links = ({ href, label }: LinksProps) => {
    return (
        <Link
            href={href}
            className=" text-primary hover:underline hover:underline-offset-2 mx-[2px]"
        >
            {label}
        </Link>
    );
};

export default Links;
