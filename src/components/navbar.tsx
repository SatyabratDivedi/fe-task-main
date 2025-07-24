import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold">
          MyShop
        </Link>
      </div>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
