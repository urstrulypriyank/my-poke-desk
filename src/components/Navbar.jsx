import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/pokdesk1.png";
const Navbar = () => {
  return (
    <div className="flex justify-center items-center h-12 p-2 bg-[#f57522]  shadow-md shadow-[#f57522]">
        <Link href="/">
          <Image alt="Pokedex" src={logo} priority width={50} height={50} />
        </Link>
        
    
    </div>
  );
};

export default Navbar;
