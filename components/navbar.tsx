import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const NavBar = ()=> {
  return (
   <div className="w-full h-50 px-2">
        <ul className="flex justify-center items-center gap-2">
            <li>
                <div className="w-50 h-50">
                    <Image src="/vercel.svg" alt="logo" width="10" height="10" />
                </div>
            </li>
            <li className="w-fit">
            <div>
                <Link href="#">About</Link>
            </div>
            </li>
            <li>
                <Input type="search" placeholder="Search..."/>
            </li>
            <li className="flex gap-1">
                <Button variant="outline">Signup</Button>
                <Button>Login</Button>
            </li>
        </ul>

      
   </div>
  )
}

export default NavBar
