import Image from "next/image";

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full md:grid md:place-items-center md:grid-cols-2 z-10">
            <div className="hidden w-full h-full  md:grid place-items-center">
                <div className="   md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] relative mx-auto z-[2]">
                    <Image src="/404.png" fill objectFit="contain" alt="page" />
                </div>
                    {/* <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[600px] h-[600px] absolute z-1"
                    >
                        <path
                            fill="#61ADFF"
                            d="M32.2,-55.3C43.9,-49,56.9,-44.7,62,-35.8C67.1,-26.9,64.3,-13.5,64.6,0.2C64.9,13.8,68.4,27.7,64.8,39.1C61.1,50.6,50.4,59.6,38.4,65.3C26.4,70.9,13.2,73.2,1.1,71.3C-11,69.4,-22,63.2,- 29.2,54.8C-36.5,46.4,-40,35.7,-49,26.2C-58.1,16.7,-72.7,8.4,-78.6,-3.4C-84.5,-15.2,-81.7,-30.4,-74.4,-42.9C-67.1,-55.4,-55.2,-65.2,-42,-70.6C-28.9,-76,-14.4,-77,-2.1,-73.3C10.3,-69.7,20.5,-61.6,32.2,-55.3Z"
                            transform="translate(100 100)"
                        />
                    </svg> */}
            </div>
            <div className="w-full h-full grid items-center p-10">
                {children}
            </div>
        </div>
    );
};

export default ErrorLayout;
