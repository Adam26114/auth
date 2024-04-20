import Background from "@/components/Background";
import { Button } from "@/components/ui/button";

import { IoLogIn } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import { LoginButton } from "@/components/auth/login-button";
export default function Home() {
   return (
      <main className="h-full w-full flex flex-col items-center justify-center">
         <Background>
            <div className=" space-y-6  text-center">
               <h1 className="text-6xl font-semibold drop-shadow-sm flex items-center gap-1 justify-center">
                  <IoLogIn /> Auth
               </h1>
               <p className=" text-lg text-slate-600">
                  A simple authentication service
               </p>
               <div>
                  <LoginButton mode="modal" asChild>
                     <Button className="">
                        Sign In
                        <BsArrowRightShort />
                     </Button>
                  </LoginButton>
               </div>
            </div>
         </Background>
      </main>
   );
}
