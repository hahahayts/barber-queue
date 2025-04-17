import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex items-center  space-x-6">
        <li>
          <a href="#" className="hover:text-blue-200 transition">
            Home
          </a>
        </li>
        <li>
          <Link href="/services" className="hover:text-blue-200 transition">
            Services
          </Link>
        </li>
        <li>
          <SignedOut>
            <SignUpButton />
          </SignedOut>
          <div className="flex items-center gap-5">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
