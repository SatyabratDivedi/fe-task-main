import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link href="/" className="text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity">
            MyShop
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
