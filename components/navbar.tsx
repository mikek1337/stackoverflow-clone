import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
const NavBar = ()=> {
  return (
   <div className="w-full h-50 p-2 px-10">
        <ul className="flex justify-center items-center gap-4">
            <li className="w-fit">
                <div className="w-52 h-fit">
                    <Image src="/logo.svg" alt="logo" width="10" height="20" />
                </div>
            </li>
            <li className="w-fit">
            <div>
                <Link href="#">About</Link>
            </div>
            </li>
            <li className=" md:w-full w-98">
                <Input type="search" placeholder="Search..."/>
            </li>
            <li className="flex gap-1 justify-end w-fit">
                <Button  className="w-20">Login</Button>
                <Button variant="secondary" className="w-20">Signup</Button>
            </li>
        </ul>

      
   </div>
  )
}

export default NavBar
