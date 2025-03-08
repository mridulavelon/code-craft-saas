"use client";
import LoginButton from "@/components/LoginButton";
import { ChevronDown, Loader, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


function HeaderProfileBtn() {
  const { data : session, status } : any = useSession();
  
  if(status === "loading"){
    <Loader className="animate-spin"/>
  }

  return (
    <>
     {session ? (
         <div className="relative group flex flex-col font-semibold">
         <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex flex-row gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-semibold" type="button" >
            <Image 
             src={session.user.image}
             height={30}
             width={30}
             alt="userimage"
             className="rounded-full"
            />
           {session.user.name}
           <ChevronDown />
         </button>
         <div id="dropdown" className="invisible absolute top-full w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 group-hover:visible">
         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
           <li>
             <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
           </li>
           <li>
             <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => signOut()}>Sign out</Link>
           </li>
         </ul>
     </div>
     </div>
     ) : (
       <LoginButton />
     )}
    </>
  );
}
export default HeaderProfileBtn;
